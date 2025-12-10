import React from "react";
import { getPayloadImage } from "../lib/payload";

const RichText = ({ content }) => {
  if (!content?.root?.children) return null;

  return (
    <div className="rich-text-content">
      {content.root.children.map((node, i) => (
        <Node key={i} node={node} />
      ))}
    </div>
  );
};

const Node = ({ node }) => {
  // 1. Handle basic text formatting (Bold, Italic, etc.)
  if (node.type === "text") {
    let text = <span dangerouslySetInnerHTML={{ __html: node.text }} />;
    if (node.format & 1) text = <strong>{text}</strong>;
    if (node.format & 2) text = <em>{text}</em>;
    if (node.format & 8) text = <u>{text}</u>;
    if (node.format & 16) text = <code>{text}</code>;
    return text;
  }

  // Handle Line Breaks
  if (!node || node.type === "linebreak") {
    return <br />;
  }

  // Recursive rendering for children nodes
  const children = node.children?.map((child, i) => (
    <Node key={i} node={child} />
  ));

  switch (node.type) {
    // ✅ FIX: Handle Payload 3.0 "heading" type
    case "heading":
      switch (node.tag) {
        case "h1":
          return (
            <h1 className="text-3xl font-bold mt-10 mb-4 text-slate-900 border-b border-slate-200 pb-2">
              {children}
            </h1>
          );
        case "h2":
          return (
            <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-900">
              {children}
            </h2>
          );
        case "h3":
          return (
            <h3 className="text-xl font-bold mt-6 mb-3 text-slate-900">
              {children}
            </h3>
          );
        case "h4":
          return (
            <h4 className="text-lg font-bold mt-5 mb-2 text-slate-900">
              {children}
            </h4>
          );
        case "h5":
          return (
            <h5 className="text-base font-bold mt-4 mb-2 text-slate-900 uppercase tracking-wide">
              {children}
            </h5>
          );
        default:
          return (
            <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-900">
              {children}
            </h2>
          );
      }

    // Legacy fallback (for older Payload versions, just in case)
    case "h1":
      return (
        <h1 className="text-3xl font-bold mt-10 mb-4 text-slate-900 border-b border-slate-200 pb-2">
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-900">
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3 className="text-xl font-bold mt-6 mb-3 text-slate-900">
          {children}
        </h3>
      );

    // Standard Blocks
    case "paragraph":
      // Check if paragraph is empty or just has a break
      if (
        children.length === 0 ||
        (children.length === 1 && children[0].type === "br")
      )
        return <br />;
      return (
        <p className="mb-6 leading-relaxed text-slate-700 text-lg">
          {children}
        </p>
      );

    case "ul":
      return (
        <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-700 marker:text-indigo-500">
          {children}
        </ul>
      );

    case "ol":
      return (
        <ol className="list-decimal pl-6 mb-6 space-y-2 text-slate-700 marker:text-indigo-500">
          {children}
        </ol>
      );

    case "li":
      return <li className="pl-1">{children}</li>;

    case "link":
      return (
        <a
          href={node.fields?.url}
          target={node.fields?.newTab ? "_blank" : "_self"}
          rel="noopener noreferrer"
          className="text-indigo-600 underline hover:text-indigo-800 transition-colors font-medium"
        >
          {children}
        </a>
      );

    case "upload":
      return (
        <div className="my-10 rounded-xl overflow-hidden shadow-md border border-slate-100">
          {node.value?.url && (
            <img
              src={getPayloadImage(node.value)}
              alt={node.value.alt || ""}
              className="w-full h-auto object-cover"
            />
          )}
          {node.fields?.caption && (
            <p className="text-sm text-center text-slate-500 p-3 bg-slate-50 border-t border-slate-100 italic">
              {node.fields.caption}
            </p>
          )}
        </div>
      );

    case "quote":
      return (
        <blockquote className="border-l-4 border-indigo-600 pl-6 py-4 my-8 italic text-xl text-slate-800 bg-slate-50 rounded-r-lg shadow-sm">
          {children}
        </blockquote>
      );

    default:
      return <div className="mb-4">{children}</div>;
  }
};

export default RichText;

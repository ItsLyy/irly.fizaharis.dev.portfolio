/**
 * Node Modules
 */
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  javascript,
  jsx,
  tsx,
  typescript,
  json,
  bash,
} from "react-syntax-highlighter/dist/esm/languages/prism";

SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("js", javascript);
SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("ts", typescript);
SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("sh", bash);

const markdownClasses = {
  wrapper:
    "markdown-content text-foreground max-w-none [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:opacity-90",
  h1: "text-2xl font-semibold text-foreground border-b border-border pb-2",
  h2: "text-xl font-semibold text-foreground mt-4 mb-2 border-b border-border/80 pb-1.5",
  h3: "text-lg font-medium text-foreground mb-1 mt-4",
  p: "text-muted my-2",
  ul: "list-disc list-inside text-muted",
  ol: "list-decimal list-inside text-muted",
  li: "leading-relaxed",
  blockquote: "border-l-4 border-accent pl-4 italic text-faint my-4",
  code: "rounded bg-background px-1.5 py-0.5 text-sm font-mono text-foreground",
  pre: "!my-2 overflow-x-auto rounded-lg",
  hr: "my-3! text-faint",
};

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className={markdownClasses.wrapper}>
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className={markdownClasses.h1}>{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className={markdownClasses.h2}>{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className={markdownClasses.h3}>{children}</h3>
          ),
          p: ({ children }) => <p className={markdownClasses.p}>{children}</p>,
          ul: ({ children }) => (
            <ul className={markdownClasses.ul}>{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className={markdownClasses.ol}>{children}</ol>
          ),
          li: ({ children }) => (
            <li className={markdownClasses.li}>{children}</li>
          ),
          hr: () => <hr className={markdownClasses.hr} />,
          blockquote: ({ children }) => (
            <blockquote className={markdownClasses.blockquote}>
              {children}
            </blockquote>
          ),
          code(props) {
            const { children, className, node, ref, ...rest } = props;
            void node;
            void ref;
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <SyntaxHighlighter
                {...rest}
                PreTag="div"
                language={match[1]}
                style={oneDark}
                customStyle={{ margin: 0 }}
                className={markdownClasses.pre}
                codeTagProps={{ className: "text-sm" }}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code
                {...rest}
                className={`${markdownClasses.code} ${className ?? ""}`}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}

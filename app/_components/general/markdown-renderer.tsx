/**
 * Node Modules
 */
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const markdownClasses = {
  wrapper:
    "markdown-content text-app-100 max-w-none [&_a]:text-app-400 [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:opacity-90",
  h1: "text-2xl font-semibold text-app-100 border-b border-app-300 pb-2",
  h2: "text-xl font-semibold text-app-100 mt-4 mb-2 border-b border-app-300/80 pb-1.5",
  h3: "text-lg font-medium text-app-100 mb-1 mt-4",
  p: "text-app-200 my-2",
  ul: "list-disc list-inside text-app-200",
  ol: "list-decimal list-inside text-app-200",
  li: "leading-relaxed",
  blockquote: "border-l-4 border-app-400 pl-4 italic text-app-250 my-4",
  code: "rounded bg-app-500 px-1.5 py-0.5 text-sm font-mono text-app-100",
  pre: "!my-2 overflow-x-auto rounded-lg",
  hr: "my-3! text-app-250",
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
            const {
              children,
              className,
              node,
              ref: _ref,
              key: _key,
              ...rest
            } = props;
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <SyntaxHighlighter
                {...rest}
                PreTag="div"
                children={String(children).replace(/\n$/, "")}
                language={match[1]}
                style={oneDark}
                customStyle={{ margin: 0 }}
                className={markdownClasses.pre}
                codeTagProps={{ className: "text-sm" }}
              />
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

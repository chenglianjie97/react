import ExampleTheme from "./themes/ExampleTheme";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { $createParagraphNode, $getRoot } from "lexical";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { $convertFromMarkdownString, TRANSFORMERS } from "@lexical/markdown";

import ToolbarPlugin from "./plugins/ToolbarPlugin";
import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import OnChangeMarkdown from "./plugins/OnChangeMarkdown";

export default function Editor(props) {
  const editorConfig = {
    // 主题
    theme: ExampleTheme,
    // editorState: props.value,
    onError(error) {
      throw error;
    },
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode,
    ],
  };
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            editorState={() => {
              let str = (props.value || "").replace(/\n\n<br>\n/g, "\n");
              console.log("str", str);
              // If we still have br tags, we're coming from Slate, apply
              // Slate list collapse and remove remaining br tags
              // https://github.com/facebook/lexical/issues/2208
              if (str.match(/<br>/g)) {
                str = str.replace(/^(\n)(?=\s*[-+\d.])/gm, "").replace(/<br>/g, "");
              }

              str = str
                // Unescape HTML characters
                .replace(/&quot;/g, '"')
                .replace(/&amp;/g, "&")
                .replace(/&#39;/g, "'")
                .replace(/&lt;/g, "<")
                .replace(/&gt;/g, ">");

              if (!str) {
                // if string is empty and this is not an update
                // don't bother trying to $convertFromMarkdown
                // below we properly initialize with the correct state allowing for
                // AutoFocus to work (as there is state to focus on), which works better
                // than $convertFromMarkdownString('')
                const root = $getRoot();
                const paragraph = $createParagraphNode();
                root.append(paragraph);
                return;
              }

              $convertFromMarkdownString(str, TRANSFORMERS);
            }}
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<div className="editor-placeholder">请输入...</div>}
          />
          <OnChangeMarkdown onChange={props.onChange} />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </div>
      </div>
    </LexicalComposer>
  );
}

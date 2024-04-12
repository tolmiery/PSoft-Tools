import { EditorProps, useMonaco } from "@monaco-editor/react";
import { useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import useDafny from "../hooks/useDafny";
export default function DafnyEditor({
  EditorProps,
}: {
  EditorProps: EditorProps;
}) {
  const monaco = useMonaco();
  const dafny = useDafny();
  const language = dafny.langDef;
  useEffect(() => {
    if (monaco) {
      monaco.languages.register({ id: "dafny" });
      monaco.languages.setMonarchTokensProvider("dafny", language);

      monaco.languages.registerCompletionItemProvider("dafny", {
        provideCompletionItems: (model, position) => {
          const word = model.getWordUntilPosition(position);
          const range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
          };

          return { suggestions: dafny.suggestionsWithRange(range) };
        },
      });
    }
  }, [monaco]);

  return <Editor {...EditorProps} />;
}

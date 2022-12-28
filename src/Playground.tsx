//@ts-nocheck

import React, { FC, useState, createElement } from "react";
import { useId } from "@reach/auto-id";
import { styled, setup, DefaultTheme } from "goober";

import Editor from "./Editor";
import Result from "./Result";
import { ISnippet, IEditorTabs, IResultTabs } from "./types";
import { ThemeProvider, useTheme } from "./utils/ThemeProvider";
import { ColorMode } from "./utils/theme";
import media from "./utils/media";
import Draggable from "./Draggable";

setup(createElement, undefined, useTheme);

const StyledDraggable = styled(Draggable)`
  border: 0.1em solid ${(props) => props.theme.container.borderColor};
  border-bottom: 0;
  display: flex;
  flex-direction: row;
  min-height: ${(props) => props.theme.container.minHeight};

  ${media.phone} {
    flex-direction: column;
  }
`;

interface IProps {
  initialSnippet: ISnippet;
  defaultEditorTab?: IEditorTabs;
  defaultResultTab?: IResultTabs;
  transformJs?: boolean;
  presets?: string[];
  id?: string;
  theme?: DefaultTheme;
  mode: ColorMode;
  onChange?: (snippet: ISnippet) => void;
  showEditor?: boolean;
  showResult?: boolean;
  showConsole?: boolean;
}

const Playground: FC<IProps> = ({
  id: userId,
  initialSnippet,
  defaultEditorTab = "markup",
  defaultResultTab = "result",
  transformJs = false,
  presets = [],
  theme,
  mode = "dark",
  onChange,
  showEditor = true,
  showResult = true,
  showConsole = false,
}) => {
  const [snippet, setSnippet] = useState<ISnippet>(initialSnippet);
  const id = useId(userId) as string;

  const onSnippetChange = (changed: string, type: IEditorTabs) => {
    setSnippet((snippet) => ({
      ...snippet,
      [type]: changed,
    }));
    onChange(changed, type);
  };

  return (
    <ThemeProvider userTheme={theme} mode={mode}>
      <div className="playground">
        <StyledDraggable
          leftChild={(width) => {
            return (
              <Editor
                width={width}
                code={snippet}
                defaultTab={defaultEditorTab}
                onChange={onSnippetChange}
              />
            );
          }}
          rightChild={(width) => {
            return (
              <Result
                width={width}
                id={id}
                snippet={snippet}
                defaultTab={defaultResultTab}
                transformJs={transformJs}
                presets={presets}
                showConsole={showConsole}
              />
            );
          }}
        />
      </div>
      <div
        style={{
          width: "99.5%",
          height: "20px",
          backgroundColor: "rgb(1, 21, 21)",
        }}
      ></div>
    </ThemeProvider>
  );
};

export default Playground;

/** @jsxImportSource @emotion/react */
import { css, ThemeProvider, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { theme } from "./theme";

/* ---------- Static styles ---------- */

const titleStyle = css`
  font-size: 22px;
  font-weight: 600;
  color: #3b3b5c;
  margin-bottom: 8px;
`;

/* ---------- css prop ---------- */

const cardStyle = (primary?: boolean) => css`
  padding: 16px;
  border-radius: 12px;
  background: ${primary ? "#eef2ff" : "#ffffff"};
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
`;

/* ---------- styled API ---------- */

const Button = styled.button<{ primary?: boolean }>`
  padding: 10px 14px;
  border-radius: 8px;
  border: none;
  cursor: pointer;

  background: ${({ theme, primary }) =>
    primary ? theme.colors.primary : theme.colors.muted};

  color: white;

  &:hover {
    opacity: 0.9;
  }
`;

/* ---------- dynamic styles ---------- */

const Badge = styled.span<{ status: "success" | "error" }>`
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;

  background: ${({ status }) =>
    status === "success" ? "#dcfce7" : "#fee2e2"};

  color: ${({ status }) =>
    status === "success" ? "#166534" : "#991b1b"};
`;

/* ---------- useTheme ---------- */

function ThemedBox() {
  const theme = useTheme();

  return (
    <div
      css={css`
        padding: 12px;
        background: ${theme.colors.background};
        border-left: 4px solid ${theme.colors.secondary};
        border-radius: 8px;
      `}
    >
      Uses theme via hook
    </div>
  );
}

/* ---------- Main component ---------- */

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* Page wrapper */}
      <div
        css={css`
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 48px 16px;
          background: ${theme.colors.background};
        `}
      >
        {/* Centered content */}
        <div
          css={css`
            width: 100%;
            max-width: 720px;
            display: grid;
            gap: 20px;
            padding: 28px;
            background: white;
            border-radius: 18px;
            box-shadow: 0 12px 36px rgba(30, 30, 60, 0.08);
          `}
        >
          <h2 css={titleStyle}>Emotion demo</h2>

          <div css={cardStyle()}>
            Card using <strong>css prop</strong>
          </div>

          <div
            css={css`
              display: flex;
              gap: 12px;
              flex-wrap: wrap;
            `}
          >
            <Button primary>Primary Button</Button>
            <Button>Secondary Button</Button>
          </div>

          <div
            css={css`
              display: flex;
              gap: 8px;
            `}
          >
            <Badge status="success">Success</Badge>
            <Badge status="error">Error</Badge>
          </div>

          <ThemedBox />
        </div>
      </div>
    </ThemeProvider>
  );
}

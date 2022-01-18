import React from "react";
import { Avatar, Space, Tooltip } from "antd";
import css from "styled-jsx/css";
import { usePanTag } from "../../hooks/usePanTag";
import { useInEu4Analysis } from "../SideBarContainer";

type AvatarProps = React.ComponentProps<typeof Avatar>;
interface FlagAvatarCoreProps {
  tag: string;
  size?: AvatarProps["size"];
}

interface FlagAvatarProps {
  tag: string;
  name: string;
  size?: AvatarProps["size"];
  condensed?: boolean;
}

export const FlagAvatarCore: React.FC<FlagAvatarCoreProps> = ({
  tag,
  size,
}) => {
  let flag_src = "";
  try {
    flag_src = require(`@/images/eu4/flags/${tag}.png`);
  } catch {
    flag_src = require(`@/images/eu4/flags/REB.png`);
  }

  // We need create a small border around flag avatars as some countries
  // are white at the edges (like austria). Using a 1px border resulted
  // in a weird gap in chrome so we have to use outline with a negative
  // offset to account for the avatar's border radius.
  const style = {
    outline: "1px solid #666",
    outlineOffset: "-1px",
  };

  return (
    <Avatar
      shape="square"
      size={size || "small"}
      src={flag_src}
      style={style}
    />
  );
};

const { className, styles } = css.resolve`
  button {
    border: 0;
    padding: 4px;
    background-color: transparent;
    cursor: pointer;
  }

  button:hover {
    background-color: revert;
  }

  button:active {
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15),
      inset 0 0 6px rgba(0, 0, 0, 0.2);
  }
`;

const InGameFlagAvatar: React.FC<FlagAvatarProps> = ({
  tag,
  name,
  size,
  condensed = false,
}) => {
  const panTag = usePanTag();
  if (!condensed) {
    return (
      <Tooltip title={tag}>
        <button className={className} onClick={() => panTag(tag)}>
          <Space style={{ textAlign: "start" }}>
            <FlagAvatarCore tag={tag} size={size} />
            <span>{name}</span>
          </Space>
        </button>
        {styles}
      </Tooltip>
    );
  } else {
    return (
      <Tooltip title={`${name} (${tag})`}>
        <button className={className} onClick={() => panTag(tag)}>
          <Space>
            <FlagAvatarCore tag={tag} size={size} />
          </Space>
        </button>
        {styles}
      </Tooltip>
    );
  }
};

const OutOfGameFlagAvatar: React.FC<FlagAvatarProps> = ({
  tag,
  name,
  size,
  condensed = false,
}) => {
  if (!condensed) {
    return (
      <Tooltip title={tag}>
        <Space style={{ textAlign: "start" }}>
          <FlagAvatarCore tag={tag} size={size} />
          <span>{name}</span>
        </Space>
      </Tooltip>
    );
  } else {
    return (
      <Tooltip title={`${name} (${tag})`}>
        <Space>
          <FlagAvatarCore tag={tag} size={size} />
        </Space>
      </Tooltip>
    );
  }
};

export const FlagAvatar: React.FC<FlagAvatarProps> = (props) => {
  // If we're using a flag avatar inside eu4 then we can pan to the map
  if (useInEu4Analysis()) {
    return <InGameFlagAvatar {...props} />;
  } else {
    return <OutOfGameFlagAvatar {...props} />;
  }
};

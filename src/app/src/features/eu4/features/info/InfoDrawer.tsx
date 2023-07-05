import React, { useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
import { Button, Descriptions, Divider, Tooltip } from "antd";
import Link from "next/link";
import { TimeAgo } from "@/components/TimeAgo";
import { difficultyText } from "@/lib/difficulty";
import { DlcList } from "@/features/eu4/components/dlc-list";
import { TagTransition } from "@/features/eu4/types/models";
import {
  AchievementAvatar,
  FlagAvatar,
  FlagAvatarCore,
  TagFlag,
} from "@/features/eu4/components/avatars";
import { Aar } from "./Aar";
import { FlipBook, StringFlipBook } from "../../components/flip-book";
import { ModList } from "./ModList";
import { useSideBarContainerRef } from "../../components/SideBarContainer";
import { useEu4Worker, Eu4Worker } from "@/features/eu4/worker";
import { useIsPrivileged } from "@/services/appApi";
import {
  emptyEu4CountryFilter,
  useAchievements,
  useEu4Actions,
  useEu4Meta,
  useEu4ModList,
  useServerSaveFile,
  useTagFilter,
} from "../../store";
import { cx } from "class-variance-authority";

const TagDescription = (play: TagTransition) => {
  return (
    <div className="flex flex-col items-center">
      <FlagAvatarCore tag={play.tag} size="large" />
      <div>{play.name}</div>
      <div>{play.date}</div>
    </div>
  );
};

const playerHistoriesFn = (worker: Eu4Worker) => worker.eu4GetPlayerHistories();
const luckyCountriesFn = (worker: Eu4Worker) => worker.eu4GetLuckyCountries();

export const InfoDrawer = () => {
  const mods = useEu4ModList();
  const meta = useEu4Meta();
  const achievements = useAchievements();
  const serverFile = useServerSaveFile();
  const playerHistories = useEu4Worker(playerHistoriesFn);
  const luckyCountries = useEu4Worker(luckyCountriesFn);
  const sideBarContainerRef = useSideBarContainerRef();
  const [filteredTag, setFilteredTag] = useState<string | undefined>(undefined);
  const [initialTagFilter] = useState(useTagFilter());
  const { updateTagFilter: updateTagFilter } = useEu4Actions();
  const isPrivileged = useIsPrivileged(serverFile?.user_id);

  const visibleTag = async (tag: string) => {
    if (tag === filteredTag) {
      updateTagFilter(initialTagFilter);
      setFilteredTag(undefined);
    } else {
      updateTagFilter({
        ...emptyEu4CountryFilter,
        include: [tag],
      });
      setFilteredTag(tag);
    }
  };

  const version = meta.savegame_version;
  const patch = `${version.first}.${version.second}.${version.third}.${version.fourth}`;
  const descriptionStyle = { verticalAlign: "middle" };
  return (
    <div ref={sideBarContainerRef}>
      <Descriptions>
        {serverFile && (
          <Descriptions.Item label="Uploaded">
            <TimeAgo date={serverFile.upload_time} />
          </Descriptions.Item>
        )}

        {serverFile && (
          <Descriptions.Item label="By">
            <Link href={`/users/${serverFile.user_id}`}>
              {serverFile.user_name}
            </Link>
          </Descriptions.Item>
        )}
        <Descriptions.Item label="Date">{meta.date}</Descriptions.Item>
        <Descriptions.Item label="Start">{meta.start_date}</Descriptions.Item>
        <Descriptions.Item label="Patch">{patch}</Descriptions.Item>
        <Descriptions.Item label="Difficulty">
          {difficultyText(meta.gameplayOptions.difficulty)}
        </Descriptions.Item>
        <Descriptions.Item label="Achievements">
          {achievements.kind == "Compatible" &&
            (achievements.achievements.length == 0 ? (
              <span>[none]</span>
            ) : (
              achievements.achievements.map((x) => (
                <Tooltip key={x.id} title={x.name}>
                  <div>
                    <AchievementAvatar size="large" id={x.id} />
                  </div>
                </Tooltip>
              ))
            ))}
        </Descriptions.Item>
        <Descriptions.Item label={`Mods ${mods.length}`}>
          <ModList />
        </Descriptions.Item>
        <Descriptions.Item label="DLC">
          <DlcList dlc_enabled={meta.dlc} />
        </Descriptions.Item>
      </Descriptions>
      <Divider orientation="left">Countries</Divider>
      <div className="grid gap-4 md:grid-cols-2">
        {playerHistories.data?.map((item) => (
          <div
            key={item.latest}
            className={cx(
              "space-y-5 border border-solid border-gray-200 p-4",
              item.annexed && "bg-rose-100",
              !item.is_human && !item.annexed && "bg-gray-100"
            )}
          >
            <div className="flex">
              <div className="grow">
                <TagFlag tag={item.latest} size="large">
                  {item.name}
                </TagFlag>
              </div>
              <div className="flex items-center gap-2">
                {!item.annexed && (
                  <Tooltip title={`Show only ${item.name} on the map`}>
                    <Button
                      icon={<EyeOutlined />}
                      onClick={() => {
                        visibleTag(item.latest);
                      }}
                    ></Button>
                  </Tooltip>
                )}
              </div>
            </div>
            <div className="border border-solid border-gray-200"></div>
            <Descriptions column={1} labelStyle={{ alignSelf: "center" }}>
              <Descriptions.Item
                style={descriptionStyle}
                label={`${item.annexed ? "Annexed" : "Status"}`}
              >
                {item.annexed ?? (item.is_human ? "online" : "offline")}
              </Descriptions.Item>

              <Descriptions.Item
                style={descriptionStyle}
                label={`Player${item.player_names.length == 1 ? "" : "s"}`}
              >
                <StringFlipBook items={item.player_names} />
              </Descriptions.Item>
              <Descriptions.Item style={descriptionStyle} label={`History`}>
                <FlipBook
                  items={item.transitions}
                  itemRender={(play) => <TagDescription {...play} />}
                />
              </Descriptions.Item>
            </Descriptions>
          </div>
        ))}
      </div>
      {luckyCountries.data && luckyCountries.data.length > 0 ? (
        <>
          <Divider orientation="left">Lucky Countries</Divider>
          <div className="grid grid-cols-5 gap-2">
            {luckyCountries.data.map((x) => (
              <FlagAvatar key={x.tag} tag={x.tag} name={x.name} size="large" />
            ))}
          </div>
        </>
      ) : null}
      {(serverFile?.aar || isPrivileged) && (
        <>
          <Divider orientation="left">AAR</Divider>
          <Aar
            defaultValue={serverFile?.aar || ""}
            editMode={isPrivileged ? "privileged" : "never"}
          />
        </>
      )}
    </div>
  );
};

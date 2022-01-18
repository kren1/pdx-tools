import { useEu4ModList } from "@/features/eu4/eu4Slice";

export const ModList: React.FC<{}> = () => {
  const mods = useEu4ModList();
  return (
    <ul>
      {mods.sort().map((x) => (
        <li key={x}>{x}</li>
      ))}
      <style jsx>{`
        ul {
          max-height: 120px;
          overflow: auto;
          padding-left: 0;
        }

        li {
          list-style: none;
        }
      `}</style>
    </ul>
  );
};

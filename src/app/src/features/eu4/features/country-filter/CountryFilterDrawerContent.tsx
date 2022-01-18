import React, { useState } from "react";
import { Button, Divider } from "antd";
import {
  useCountryFilterDispatch,
  useCountryFilterState,
} from "./countryFilterContext";
import { CountryFilterForm } from "./CountryFilterForm";
import { useDispatch } from "react-redux";
import { setEu4CountryFilter } from "@/features/eu4/eu4Slice";
import { CountrySelect } from "../../components/country-select";

interface CountryFilterDrawerContent {
  closeDrawer: () => void;
}

export const CountryFilterDrawerContent: React.FC<
  CountryFilterDrawerContent
> = ({ closeDrawer }) => {
  const [forceShowFiltered, setForceShowFiltered] = useState(false);
  const filter = useCountryFilterState();
  const localDispatch = useCountryFilterDispatch();
  const globalDispatch = useDispatch();
  const manySelectedTags = filter.countries.length > 50;

  return (
    <>
      <Divider orientation="left">{`Computed Selection (${filter.countries.length})`}</Divider>
      <div style={{ height: "150px" }}>
        {!forceShowFiltered && manySelectedTags && (
          <Button
            type="link"
            onClick={() => setForceShowFiltered(true)}
          >{`Show all ${filter.countries.length} selected countries`}</Button>
        )}
        {(forceShowFiltered || !manySelectedTags) && (
          <CountrySelect
            mode="multiple"
            value={filter.countries.map((x) => x.tag)}
            allowClear
            style={{ width: "100%", maxHeight: "150px", overflow: "auto" }}
            onDeselect={(tag) =>
              localDispatch({ kind: "exclude-tag", tag: tag as string })
            }
            onSelect={(tag) =>
              localDispatch({ kind: "include-tag", tag: tag as string })
            }
          />
        )}
      </div>
      <Divider orientation="left">Options</Divider>
      <CountryFilterForm
        initialValues={filter.matcher}
        onChange={(x) => {
          closeDrawer();
          globalDispatch(setEu4CountryFilter(x));
        }}
      />
    </>
  );
};

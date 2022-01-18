import React, { useCallback, useRef, useState } from "react";
import { Divider, Space, Switch, Table, Typography } from "antd";
import { ColumnProps } from "antd/lib/table";
import { incomeLedgerAliases } from "../country-details/data";
import { CountryIncome } from "../../types/models";
import { useIsLoading } from "../../../../components/viz/visualization-context";
import { countryColumnFilter } from "./countryColumnFilter";
import { formatFloat } from "@/lib/format";
import {
  useAnalysisWorker,
  WorkerClient,
} from "../../../engine/worker/wasm-worker-context";
import { useSelector } from "react-redux";
import { selectEu4CountryFilter } from "@/features/eu4/eu4Slice";
import {
  selectOneTimeLineItems,
  selectPrefersPercents,
  setPrefersPercents,
  setShowOneTimeLineItems,
} from "../../../engine/engineSlice";
import { useAppDispatch } from "@/lib/store";
import { FlagAvatar } from "@/features/eu4/components/avatars";
const { Text } = Typography;

type CountryIncomeRecord = CountryIncome;

export const CountriesIncomeTable: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const isLoading = useIsLoading();
  const [data, setData] = useState<CountryIncomeRecord[]>([]);
  const doShowPercent = useSelector(selectPrefersPercents);
  const showRecurringOnly = !useSelector(selectOneTimeLineItems);
  const aliases = incomeLedgerAliases();
  const countryFilter = useSelector(selectEu4CountryFilter);
  const selectFilterRef = useRef(null);

  const cb = useCallback(
    async (worker: WorkerClient) => {
      const result = await worker.eu4GetCountriesIncome(
        countryFilter,
        doShowPercent,
        showRecurringOnly
      );
      setData(result);
    },
    [countryFilter, doShowPercent, showRecurringOnly]
  );

  useAnalysisWorker(cb);

  const mapping = aliases;

  const numRenderer = doShowPercent
    ? (x: number) => `${x}%`
    : (x: number) => formatFloat(x, 2);

  const dataColumns: ColumnProps<CountryIncomeRecord>[] = mapping.map(
    ([key, text]) => ({
      title: text,
      dataIndex: key,
      render: numRenderer,
      align: "right",
      width: 25 + text.length * 8,
      sorter: (a: any, b: any) => a[key] - b[key],
    })
  );

  const columns: ColumnProps<CountryIncomeRecord>[] = [
    {
      title: "Country",
      dataIndex: "name",
      fixed: "left",
      width: 175,
      render: (name: string, x: CountryIncome) => (
        <FlagAvatar tag={x.tag} name={x.name} size="large" />
      ),
      sorter: (a: CountryIncome, b: CountryIncome) =>
        a.name.localeCompare(b.name),
      ...countryColumnFilter(selectFilterRef, (record) => record.tag),
    },
    ...dataColumns,
  ];

  if (!doShowPercent) {
    columns.push({
      title: "Total",
      dataIndex: "total",
      fixed: "right",
      align: "right",
      width: 100,
      render: numRenderer,
      sorter: (a: CountryIncome, b: CountryIncome) => a.total - b.total,
    });
  }

  return (
    <>
      <Space direction="vertical" size="large" style={{ display: "flex" }}>
        <Space>
          <Space size="small">
            <Text>Show as percentages:</Text>

            <Switch
              checked={doShowPercent}
              onChange={(checked: boolean) =>
                dispatch(setPrefersPercents(checked))
              }
            />
          </Space>

          <Divider type="vertical" />
          <Space size="small">
            <Text>Recurring expenses only:</Text>
            <Switch
              checked={showRecurringOnly}
              onChange={(checked: boolean) =>
                dispatch(setShowOneTimeLineItems(!checked))
              }
            />
          </Space>
        </Space>
        <Table
          size="small"
          rowKey="name"
          loading={isLoading}
          dataSource={data}
          columns={columns}
          scroll={{ x: true }}
        />
      </Space>
    </>
  );
};

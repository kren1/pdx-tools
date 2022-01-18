import {
  CountryExpenseLedger,
  CountryIncomeLedger,
  CountryManaSpend,
} from "../../types/models";

// We define a specific palette instead of relying on g2plot to auto
// generate one. While the auto-generated ones are nice, by creating our own
// palette we can group categories together. For instance anything that
// deals with income from warfare should be a darker or redder color. The
// palette below was created with the following R code (and then colors
// swapped to match the category)
//
// ```
// library(RColorBrewer)
// colorRampPalette(brewer.pal(12, "Paired"))(20)
// ```
export const incomeLedgerColorPalette = (): [string, string][] => [
  ["Taxation", "#A6CEE3"],
  ["Production", "#579CC7"],
  ["Trade", "#3688AD"],
  ["Tariffs", "#8BC395"],
  ["Vassals", "#89CB6C"],
  ["Harbor Fees", "#40A635"],
  ["Subsidies", "#919D5F"],
  ["War Reparations", "#F99392"],
  ["Interest", "#DEB969"],
  ["Gifts", "#E7E099"],
  ["Events", "#F79C5D"],
  ["Gold", "#FDA746"],
  ["Spoils of War", "#FE8205"],
  ["Treasure Fleet", "#E39970"],
  ["Siphoning Income", "#BFA5CF"],
  ["Condottieri", "#8861AC"],
  ["Knowledge Sharing", "#917099"],
  ["Blockading Ports", "#E83C2D"],
  ["Looting Cities", "#EB494A"],
  ["Other", "#B15928"],
];

export const incomeLedgerAliases = (): [
  keyof CountryIncomeLedger,
  string
][] => [
  ["taxation", "Taxation"],
  ["production", "Production"],
  ["trade", "Trade"],
  ["tariffs", "Tariffs"],
  ["vassals", "Vassals"],
  ["harbor_fees", "Harbor Fees"],
  ["subsidies", "Subsidies"],
  ["war_reparations", "War Reparations"],
  ["interest", "Interest"],
  ["gifts", "Gifts"],
  ["events", "Events"],
  ["gold", "Gold"],
  ["spoils_of_war", "Spoils of War"],
  ["treasure_fleet", "Treasure Fleet"],
  ["siphoning_income", "Siphoning Income"],
  ["condottieri", "Condottieri"],
  ["knowledge_sharing", "Knowledge Sharing"],
  ["blockading_foreign_ports", "Blockading Ports"],
  ["looting_foreign_cities", "Looting Cities"],
  ["other", "Other"],
];

export const expenseLedgerColorPalette = (): [string, string][] => [
  ["Advisor Maintenance", "#A6CEE3"],
  ["Interest", "#77B0D2"],
  ["State Maintenance", "#4992C2"],
  ["Subsidies", "#237BB2"],
  ["War Reparations", "#569EA4"],
  ["Army Maintenance", "#88C295"],
  ["Fleet Maintenance", "#AADB84"],
  ["Fort Maintenance", "#7EC563"],
  ["Colonists", "#52AF43"],
  ["Missionaries", "#459F36"],
  ["Raising Armies", "#8A9D5B"],
  ["Building Fleets", "#CF9B81"],
  ["Building Fortresses", "#F88A89"],
  ["Buildings", "#EF5E5E"],
  ["Repaid Loans", "#E73233"],
  ["Gifts", "#E73328"],
  ["Hire / Promote Advisors", "#F06C45"],
  ["Events", "#F8A562"],
  ["Unjustified Demands", "#FDB35A"],
  ["Vassal Fee", "#FE9C34"],
  ["Tariffs", "#FE870D"],
  ["Support Loyalists", "#F38A2E"],
  ["Condottieri", "#E19B78"],
  ["Root out Corruption", "#CEADC1"],
  ["Embrace Institution", "#B294C7"],
  ["Knowledge Sharing", "#916CB2"],
  ["Trade Company Investments", "#70449D"],
  ["Other", "#937399"],
  ["Ports Blockaded", "#C7B699"],
  ["Cities Looted", "#FAF899"],
  ["Monuments", "#E6CB75"],
  ["CoT Upgrades", "#CB924E"],
  ["Colony Changes", "#B15928"],
];

export const expenseLedgerAliases = (): [
  keyof CountryExpenseLedger,
  string
][] => [
  ["advisor_maintenance", "Advisor Maintenance"],
  ["state_maintenance", "State Maintenance"],
  ["subsidies", "Subsidies"],
  ["war_reparations", "War Reparations"],
  ["army_maintenance", "Army Maintenance"],
  ["fleet_maintenance", "Fleet Maintenance"],
  ["fort_maintenance", "Fort Maintenance"],
  ["colonists", "Colonists"],
  ["missionaries", "Missionaries"],
  ["raising_armies", "Raising Armies"],
  ["building_fleets", "Building Fleets"],
  ["building_fortresses", "Building Fortresses"],
  ["buildings", "Buildings"],
  ["trade_company_investments", "Trade Company Investments"],
  ["interest", "Interest"],
  ["repaid_loans", "Repaid Loans"],
  ["gifts", "Gifts"],
  ["advisors", "Hire / Promote Advisors"],
  ["events", "Events"],
  ["peace", "Peace"],
  ["vassal_fee", "Vassal Fee"],
  ["tariffs", "Tariffs"],
  ["support_loyalists", "Support Loyalists"],
  ["condottieri", "Condottieri"],
  ["root_out_corruption", "Root out Corruption"],
  ["embrace_institution", "Embrace Institution"],
  ["knowledge_sharing", "Knowledge Sharing"],
  ["other", "Other"],
  ["ports_blockaded", "Ports Blockaded"],
  ["cities_looted", "Cities Looted"],
  ["monuments", "Monuments"],
  ["cot_upgrades", "CoT Upgrades"],
  ["colony_changes", "Colony Changes"],
];

export const manaSpendAliases = (): [keyof CountryManaSpend, string][] => [
  ["buy_idea", "Ideas"],
  ["advance_tech", "Advance Tech"],
  ["boost_stab", "Boost Stab"],
  ["buy_general", "General"],
  ["buy_admiral", "Admirals"],
  ["buy_conq", "Conquistadors"],
  ["buy_explorer", "Explorers"],
  ["develop_prov", "Develop Prov"],
  ["force_march", "Force March"],
  ["assault", "Assault"],
  ["seize_colony", "Seize Colony"],
  ["burn_colony", "Burn Colony"],
  ["attack_natives", "Attack Natives"],
  ["scorch_earth", "Scorch Earth"],
  ["demand_non_wargoal_prov", "Unjustified Demands"],
  ["reduce_inflation", "Reduce Inflation"],
  ["move_capital", "Move Capital"],
  ["make_province_core", "Core Province"],
  ["replace_rival", "Replace Rival"],
  ["change_gov", "Change Govt."],
  ["change_culture", "Change Culture"],
  ["harsh_treatment", "Harsh Treatment"],
  ["reduce_we", "Reduce W.E."],
  ["boost_faction", "Boost Faction"],
  ["raise_war_taxes", "Raise War Taxes"],
  ["buy_native_advancement", "Native Advancement"],
  ["increse_tariffs", "Increase Tariffs"],
  ["promote_merc", "Promote Merc"],
  ["decrease_tariffs", "Decrease Tariffs"],
  ["move_trade_port", "Move Trade City"],
  ["create_trade_post", "Create Trade Post"],
  ["siege_sorties", "Sortie"],
  ["buy_religious_reform", "Religious Reform"],
  ["set_primary_culture", "Culture Shift"],
  ["add_accepted_culture", "Add Culture"],
  ["remove_accepted_culture", "Remove Culture"],
  ["strengthen_government", "Strengthen Govt."],
  ["boost_militarization", "Boost Militarization"],
  ["artillery_barrage", "Artillery Barrage"],
  ["establish_siberian_frontier", "Siberian Frontier"],
  ["government_interaction", "Govt. Interaction"],
  ["naval_barrage", "Naval Barrage"],
  ["create_leader", "Create Leader"],
  ["enforce_culture", "Enforce Culture"],
  ["effect", "Effect"],
  ["minority_expulsion", "Minority Explusion"],
  ["other", "Other"],
];

export const manaSpendColorPalette = (): [string, string][] => [
  ["Ideas", "#A6CEE3"],
  ["Advance Tech", "#87BAD8"],
  ["Boost Stab", "#69A7CD"],
  ["General", "#4B94C3"],
  ["Admirals", "#2C80B8"],
  ["Conquistadors", "#3084AE"],
  ["Explorers", "#519BA5"],
  ["Develop Prov", "#72B29C"],
  ["Force March", "#93C992"],
  ["Assault", "#AFDD88"],
  ["Seize Colony", "#92CF72"],
  ["Burn Colony", "#76C15D"],
  ["Attack Natives", "#59B348"],
  ["Scorch Earth", "#3DA533"],
  ["Unjustified Demands", "#4F9F3B"],
  ["Reduce Inflation", "#7C9D54"],
  ["Move Capital", "#A99C6C"],
  ["Core Province", "#D69B84"],
  ["Replace Rival", "#FA9493"],
  ["Change Govt.", "#F47877"],
  ["Change Culture", "#EF5B5B"],
  ["Harsh Treatment", "#E93E3F"],
  ["Reduce W.E.", "#E42123"],
  ["Boost Faction", "#E73429"],
  ["Raise War Taxes", "#ED593C"],
  ["Native Advancement", "#F27F4E"],
  ["Increase Tariffs", "#F8A461"],
  ["Promote Merc", "#FDBB68"],
  ["Decrease Tariffs", "#FDAC4F"],
  ["Move Trade City", "#FE9E36"],
  ["Create Trade Post", "#FE8F1D"],
  ["Sortie", "#FE8104"],
  ["Religious Reform", "#F58827"],
  ["Culture Shift", "#E99357"],
  ["Add Culture", "#DD9F87"],
  ["Remove Culture", "#D1AAB7"],
  ["Strengthen Govt.", "#C2A8D1"],
  ["Boost Militarization", "#AC8EC3"],
  ["Artillery Barrage", "#9773B6"],
  ["Siberian Frontier", "#8159A8"],
  ["Govt. Interaction", "#6B3F9B"],
  ["Naval Barrage", "#886499"],
  ["Create Leader", "#A99099"],
  ["Enforce Culture", "#CBBB99"],
  ["Effect", "#ECE799"],
  ["Minority Explusion", "#F7EE8D"],
  ["Other", "#E5C874"],
];

export const filterToRecurringIncome = (
  value: CountryIncomeLedger
): CountryIncomeLedger => ({
  ...value,
  ...{
    other: 0,
    interest: 0,
    looting_foreign_cities: 0,
    blockading_foreign_ports: 0,
    treasure_fleet: 0,
    spoils_of_war: 0,
    events: 0,
    gifts: 0,
  },
});

export function filterIncome(
  entries: CountryIncomeLedger,
  showRecurringOnly: boolean
) {
  const incomeAliases: Map<string, string> = new Map(incomeLedgerAliases());

  const fincome = showRecurringOnly
    ? filterToRecurringIncome(entries)
    : entries;
  return Object.entries(fincome)
    .filter(([_key, value]) => value !== 0.0)
    .map(([key, value]) => ({ key: incomeAliases.get(key) || key, value }));
}

export const filterToRecurringExpenses = (
  value: CountryExpenseLedger
): CountryExpenseLedger => ({
  ...value,
  ...{
    raising_armies: 0,
    building_fleets: 0,
    building_fortresses: 0,
    buildings: 0,
    repaid_loans: 0,
    gifts: 0,
    advisors: 0,
    events: 0,
    peace: 0,
    support_loyalists: 0,
    embrace_institution: 0,
    trade_company_investments: 0,
    other: 0,
    ports_blockaded: 0,
    cities_looted: 0,
  },
});

export function filterExpenses(
  entries: CountryExpenseLedger,
  showRecurringOnly: boolean
) {
  const expenseAliases: Map<string, string> = new Map(expenseLedgerAliases());

  if (!entries) {
    return [];
  }

  const expenses = showRecurringOnly
    ? filterToRecurringExpenses(entries)
    : entries;
  return Object.entries(expenses)
    .filter(([_key, value]) => value !== 0.0)
    .map(([key, value]) => ({
      key: expenseAliases.get(key) || key,
      value,
    }));
}

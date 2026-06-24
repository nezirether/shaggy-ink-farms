import { NextResponse } from "next/server";
import {
  renderToBuffer,
  Document,
  Page,
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";
import { SEED_STARTING_DATA, COMPANION_PLANTING_DATA } from "@/lib/planting-data";

export const runtime = "nodejs";

const GREEN = "#2C4A2E";
const RED = "#8B2A2A";
const GOLD = "#C6933F";
const LINEN = "#F5F0E8";

const s = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    padding: "0.35in",
    fontFamily: "Helvetica",
  },
  header: {
    backgroundColor: GREEN,
    padding: "10 14",
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLabel: {
    fontSize: 6.5,
    color: GOLD,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 16,
    color: LINEN,
    fontFamily: "Helvetica-Bold",
    marginBottom: 1,
  },
  headerSub: { fontSize: 7.5, color: "#c8c4bc" },
  badge: {
    backgroundColor: "#ffffff22",
    padding: "4 8",
    alignItems: "center",
  },
  badgeLabel: { fontSize: 6, color: GOLD, textTransform: "uppercase", letterSpacing: 0.8 },
  badgeVal: { fontSize: 9, color: LINEN, fontFamily: "Helvetica-Bold", marginTop: 1 },

  // Seed starting table
  tableWrap: { flex: 1 },
  sectionHeading: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: GREEN,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 3,
    marginTop: 2,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#2C4A2E",
    padding: "3 4",
    marginBottom: 1,
  },
  th: {
    fontSize: 6,
    color: LINEN,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  row: {
    flexDirection: "row",
    borderBottom: "0.5 solid #ebebeb",
    padding: "2.5 4",
    alignItems: "flex-start",
  },
  rowAlt: {
    flexDirection: "row",
    borderBottom: "0.5 solid #ebebeb",
    padding: "2.5 4",
    backgroundColor: "#f9f8f6",
    alignItems: "flex-start",
  },
  catRow: {
    flexDirection: "row",
    backgroundColor: "#e8ede8",
    padding: "2 4",
    marginTop: 3,
  },
  catLabel: {
    fontSize: 6,
    color: GREEN,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  td: { fontSize: 6.5, color: "#2a2a28", lineHeight: 1.35 },
  tdMuted: { fontSize: 6, color: "#7a7a78", lineHeight: 1.35 },
  colCrop: { width: "15%" },
  colIndoor: { width: "16%" },
  colDirect: { width: "16%" },
  colTransplant: { width: "16%" },
  colDtm: { width: "12%" },
  colNotes: { width: "25%" },

  // Companion planting grid
  compGrid: { flexDirection: "row", flexWrap: "wrap", gap: 5 },
  compCard: {
    width: "31.5%",
    border: "0.5 solid #d0d0cc",
    marginBottom: 2,
  },
  compHeader: {
    backgroundColor: GREEN,
    padding: "3 6",
  },
  compTitle: { fontSize: 7.5, color: LINEN, fontFamily: "Helvetica-Bold" },
  compBody: { padding: "4 6" },
  compSectionLabel: {
    fontSize: 6,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 1.5,
    marginTop: 3,
  },
  compItem: { fontSize: 6, color: "#3a3a38", lineHeight: 1.4, marginBottom: 1 },
  compNote: {
    fontSize: 5.5,
    color: "#888885",
    lineHeight: 1.35,
    marginTop: 3,
    borderTop: "0.5 solid #ebebeb",
    paddingTop: 3,
  },
  footer: {
    marginTop: 6,
    borderTop: "0.5 solid #dddddd",
    paddingTop: 4,
  },
  footerText: { fontSize: 5.5, color: "#aaaaaa" },
});

const CATEGORIES = [
  "Fruiting",
  "Cucurbit",
  "Legume",
  "Grain",
  "Brassica",
  "Green",
  "Root",
  "Allium",
  "Herb",
  "Perennial Herb",
  "Fruit",
  "Vegetable",
];

function groupByCategory(data: typeof SEED_STARTING_DATA) {
  const map: Record<string, typeof SEED_STARTING_DATA> = {};
  for (const cat of CATEGORIES) {
    const items = data.filter((d) => d.category === cat);
    if (items.length) map[cat] = items;
  }
  const rest = data.filter((d) => !CATEGORIES.includes(d.category));
  if (rest.length) map["Other"] = rest;
  return map;
}

const COL_HEADERS = [
  { label: "Crop", style: s.colCrop },
  { label: "Start Indoors", style: s.colIndoor },
  { label: "Direct Sow", style: s.colDirect },
  { label: "Transplant Out", style: s.colTransplant },
  { label: "Days", style: s.colDtm },
  { label: "Zone 9b Notes", style: s.colNotes },
];

function BundlePDF() {
  const grouped = groupByCategory(SEED_STARTING_DATA);

  return (
    <Document
      title="Zone 9b Grower's Bundle — Shaggy Ink Farms"
      author="Shaggy Ink Farms"
      subject="Seed starting schedule and companion planting reference for Zone 9b"
    >
      {/* PAGE 1: Seed Starting Schedule */}
      <Page size="LETTER" orientation="landscape" style={s.page}>
        <View style={s.header}>
          <View>
            <Text style={s.headerLabel}>Shaggy Ink Farms · Zone 9b Grower's Bundle · Page 1 of 2</Text>
            <Text style={s.headerTitle}>Seed Starting Schedule</Text>
            <Text style={s.headerSub}>Anderson, CA · Sacramento Valley · All dates timed for Zone 9b (last frost ~Feb 10)</Text>
          </View>
          <View style={s.badge}>
            <Text style={s.badgeLabel}>Zone</Text>
            <Text style={s.badgeVal}>9b</Text>
          </View>
        </View>

        {/* Table header */}
        <View style={s.tableHeader}>
          {COL_HEADERS.map(({ label, style }) => (
            <Text key={label} style={[s.th, style]}>{label}</Text>
          ))}
        </View>

        {/* Rows grouped by category */}
        {Object.entries(grouped).map(([cat, crops]) => (
          <View key={cat}>
            <View style={s.catRow}>
              <Text style={s.catLabel}>{cat}</Text>
            </View>
            {crops.map((crop, i) => (
              <View key={crop.crop} style={i % 2 === 0 ? s.row : s.rowAlt}>
                <Text style={[s.td, s.colCrop, { fontFamily: "Helvetica-Bold" }]}>{crop.crop}</Text>
                <Text style={[s.td, s.colIndoor]}>{crop.indoorStart ?? "—"}</Text>
                <Text style={[s.td, s.colDirect]}>{crop.directSow ?? "—"}</Text>
                <Text style={[s.td, s.colTransplant]}>{crop.transplant ?? "—"}</Text>
                <Text style={[s.td, s.colDtm]}>{crop.daysToMaturity}</Text>
                <Text style={[s.tdMuted, s.colNotes]}>{crop.notes.split(".")[0]}.</Text>
              </View>
            ))}
          </View>
        ))}

        <View style={s.footer}>
          <Text style={s.footerText}>
            Sources: UC ANR · UC Cooperative Extension Shasta County · Botanical Interests · Johnny's Selected Seeds · High Mowing Organic Seeds · UC Davis IPM
            {"  "}|{"  "}shaggyinkfarms.com/bundle
          </Text>
        </View>
      </Page>

      {/* PAGE 2: Companion Planting Reference */}
      <Page size="LETTER" orientation="landscape" style={s.page}>
        <View style={s.header}>
          <View>
            <Text style={s.headerLabel}>Shaggy Ink Farms · Zone 9b Grower's Bundle · Page 2 of 2</Text>
            <Text style={s.headerTitle}>Companion Planting Quick Reference</Text>
            <Text style={s.headerSub}>Zone 9b pest and companion context for Sacramento Valley growers</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 10 }}>
            {[["Good companions", GREEN], ["Keep apart", RED]].map(([label, color]) => (
              <View key={label} style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                <View style={{ width: 7, height: 7, backgroundColor: color as string }} />
                <Text style={{ fontSize: 6.5, color: LINEN }}>{label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={s.compGrid}>
          {COMPANION_PLANTING_DATA.map((entry) => (
            <View key={entry.crop} style={s.compCard}>
              <View style={s.compHeader}>
                <Text style={s.compTitle}>{entry.crop}</Text>
              </View>
              <View style={s.compBody}>
                <Text style={[s.compSectionLabel, { color: GREEN, marginTop: 0 }]}>Plant With</Text>
                {entry.goodCompanions.slice(0, 4).map((c) => (
                  <Text key={c.plant} style={s.compItem}>
                    · {c.plant} — {c.reason.split(";")[0].split(".")[0]}
                  </Text>
                ))}

                <Text style={[s.compSectionLabel, { color: RED }]}>Keep Away From</Text>
                {entry.badCompanions.slice(0, 3).map((c) => (
                  <Text key={c.plant} style={s.compItem}>
                    · {c.plant} — {c.reason.split(";")[0].split(".")[0]}
                  </Text>
                ))}

                {entry.notes && (
                  <Text style={s.compNote}>{entry.notes.split(".")[0]}.</Text>
                )}
              </View>
            </View>
          ))}
        </View>

        <View style={s.footer}>
          <Text style={s.footerText}>
            Sources: UC Davis IPM · UC ANR · Cornell Cooperative Extension · Rodale's Encyclopedia of Organic Gardening · Botanical Interests · Johnny's Selected Seeds
            {"  "}|{"  "}shaggyinkfarms.com/bundle
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export async function GET() {
  try {
    const buffer = await renderToBuffer(<BundlePDF />);
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="zone-9b-growers-bundle.pdf"',
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (err) {
    console.error("[bundle.pdf]", err);
    return NextResponse.json({ error: "PDF generation failed." }, { status: 500 });
  }
}

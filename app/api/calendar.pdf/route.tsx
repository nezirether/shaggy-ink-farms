import { NextResponse } from "next/server";
import { renderToBuffer, Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { MONTHLY_CALENDAR } from "@/lib/planting-data";

export const runtime = "nodejs";

function short(text: string): string {
  return text.split(" —")[0].trim();
}

const GREEN = "#2C4A2E";
const RED = "#8B2A2A";
const GOLD = "#C6933F";
const LINEN = "#F5F0E8";
const CHARCOAL = "#1C1C1A";

const s = StyleSheet.create({
  page: {
    size: "LETTER",
    orientation: "landscape",
    backgroundColor: "#ffffff",
    padding: "0.35in",
    fontFamily: "Helvetica",
  },
  header: {
    backgroundColor: GREEN,
    padding: "10 14",
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: { flexDirection: "column" },
  headerLabel: {
    fontSize: 6.5,
    color: GOLD,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 18,
    color: LINEN,
    fontFamily: "Helvetica-Bold",
    marginBottom: 2,
  },
  headerSub: { fontSize: 8, color: "#c8c4bc" },
  frostRow: { flexDirection: "row", gap: 10 },
  frostBox: { alignItems: "center" },
  frostLabel: {
    fontSize: 6,
    color: GOLD,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 1,
  },
  frostVal: { fontSize: 8, color: LINEN, fontFamily: "Helvetica-Bold" },
  grid: { flexDirection: "row", gap: 6, flex: 1 },
  col: { flex: 1, flexDirection: "column", gap: 5 },
  monthCard: {
    border: "0.5 solid #cccccc",
    backgroundColor: "#ffffff",
  },
  monthHeader: {
    backgroundColor: GREEN,
    padding: "4 6",
  },
  monthTitle: {
    fontSize: 8.5,
    color: LINEN,
    fontFamily: "Helvetica-Bold",
  },
  section: { padding: "3 6" },
  sectionBorder: {
    borderTop: "0.5 solid #e8e8e8",
    padding: "3 6",
  },
  sectionLabel: {
    fontSize: 6,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  item: {
    fontSize: 6.5,
    color: "#3a3a38",
    lineHeight: 1.4,
    marginBottom: 1,
  },
  itemMuted: {
    fontSize: 6,
    color: "#888885",
    lineHeight: 1.4,
    marginBottom: 1,
  },
  footer: {
    marginTop: 6,
    borderTop: "0.5 solid #dddddd",
    paddingTop: 4,
  },
  footerText: { fontSize: 5.5, color: "#aaaaaa" },
});

const GROUPS = [
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
];

const FROST = [
  ["Last Frost", "~Feb 5–15"],
  ["First Frost", "~Nov 18–28"],
  ["Frost-Free", "~275–295 days"],
  ["Zone", "9b · 25–30°F"],
];

function CalendarPDF() {
  return (
    <Document
      title="Zone 9b Planting Calendar — Shaggy Ink Farms"
      author="Shaggy Ink Farms"
      subject="Zone 9b Sacramento Valley planting calendar for Anderson, CA"
    >
      <Page size="LETTER" orientation="landscape" style={s.page}>
        {/* Header */}
        <View style={s.header}>
          <View style={s.headerLeft}>
            <Text style={s.headerLabel}>Shaggy Ink Farms · Anderson, CA</Text>
            <Text style={s.headerTitle}>Zone 9b Planting Calendar</Text>
            <Text style={s.headerSub}>Sacramento Valley · 12-Month Growing Reference</Text>
          </View>
          <View style={s.frostRow}>
            {FROST.map(([label, val]) => (
              <View key={label} style={s.frostBox}>
                <Text style={s.frostLabel}>{label}</Text>
                <Text style={s.frostVal}>{val}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Month grid */}
        <View style={s.grid}>
          {GROUPS.map((group, gi) => (
            <View key={gi} style={s.col}>
              {group.map((mi) => {
                const month = MONTHLY_CALENDAR[mi];
                return (
                  <View key={mi} style={s.monthCard}>
                    <View style={s.monthHeader}>
                      <Text style={s.monthTitle}>{month.month}</Text>
                    </View>

                    {month.sow.length > 0 && (
                      <View style={s.section}>
                        <Text style={[s.sectionLabel, { color: GREEN }]}>Sow / Start Indoors</Text>
                        {month.sow.map((item, i) => (
                          <Text key={i} style={s.item}>· {short(item)}</Text>
                        ))}
                      </View>
                    )}

                    {month.plant.length > 0 && (
                      <View style={s.sectionBorder}>
                        <Text style={[s.sectionLabel, { color: RED }]}>Transplant Out</Text>
                        {month.plant.map((item, i) => (
                          <Text key={i} style={s.item}>· {short(item)}</Text>
                        ))}
                      </View>
                    )}

                    {month.harvest.length > 0 && (
                      <View style={s.sectionBorder}>
                        <Text style={[s.sectionLabel, { color: GOLD }]}>Harvest</Text>
                        {month.harvest.map((item, i) => (
                          <Text key={i} style={s.item}>· {short(item)}</Text>
                        ))}
                      </View>
                    )}

                    {month.tasks.length > 0 && (
                      <View style={s.sectionBorder}>
                        <Text style={[s.sectionLabel, { color: "#888885" }]}>Key Tasks</Text>
                        {month.tasks.slice(0, 3).map((item, i) => (
                          <Text key={i} style={s.itemMuted}>· {short(item)}</Text>
                        ))}
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={s.footer}>
          <Text style={s.footerText}>
            Sources: UC ANR · UC Cooperative Extension Shasta County · USDA NRCS · NOAA · Botanical Interests · Johnny's Selected Seeds · High Mowing Organic Seeds · UC Davis IPM
            {"  "}|{"  "}Compiled for Anderson, CA (~365 ft). Dates reflect 50% frost probability.{"  "}|{"  "}shaggyinkfarms.com/calendar
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export async function GET() {
  try {
    const buffer = await renderToBuffer(<CalendarPDF />);
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="zone-9b-planting-calendar.pdf"',
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (err) {
    console.error("[calendar.pdf]", err);
    return NextResponse.json({ error: "PDF generation failed." }, { status: 500 });
  }
}

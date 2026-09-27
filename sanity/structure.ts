import type { StructureResolver } from "sanity/structure";

const singleton = (
  S: Parameters<StructureResolver>[0],
  typeName: string,
  title: string,
) =>
  S.listItem()
    .title(title)
    .id(typeName)
    .child(S.document().schemaType(typeName).documentId(typeName).title(title));

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      singleton(S, "siteSettings", "Site settings"),
      S.divider(),
      singleton(S, "homePage", "Home"),
      singleton(S, "aboutPage", "About"),
      singleton(S, "servicesPage", "Services"),
      singleton(S, "approachPage", "Approach"),
      singleton(S, "informationsPage", "Information"),
      singleton(S, "contactPage", "Contact"),
      S.divider(),
      S.listItem()
        .title("Service pages")
        .id("serviceDetailPage")
        .child(
          S.documentTypeList("serviceDetailPage").title("Service pages"),
        ),
      S.listItem()
        .title("Blog posts")
        .id("blogPost")
        .child(
          S.documentTypeList("blogPost").title("Blog posts").defaultOrdering([
            { field: "publishedAt", direction: "desc" },
          ]),
        ),
    ]);

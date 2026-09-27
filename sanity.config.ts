"use client";

import { defineConfig, type PluginOptions } from "sanity";
import { structureTool } from "sanity/structure";
import {
  dashboardTool,
  projectInfoWidget,
} from "@sanity/dashboard";
import { netlifyWidget } from "sanity-plugin-dashboard-widget-netlify";
import {
  dataset,
  isNetlifyDeployConfigured,
  netlifySite,
  projectId,
} from "./sanity/env";
import { schemaTypes, singletonTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

const plugins: PluginOptions[] = [
  structureTool({ structure }),
  dashboardTool({
    name: "dashboard",
    title: "Dashboard",
    widgets: [
      ...(isNetlifyDeployConfigured
        ? [
            netlifyWidget({
              title: netlifySite.title,
              sites: [
                {
                  title: netlifySite.title,
                  name: netlifySite.name,
                  apiId: netlifySite.apiId,
                  buildHookId: netlifySite.buildHookId,
                  ...(netlifySite.url ? { url: netlifySite.url } : {}),
                },
              ],
              layout: { width: "medium" },
            }),
          ]
        : []),
      projectInfoWidget({ layout: { width: "medium" } }),
    ],
  }),
];

export default defineConfig({
  name: "medican",
  title: "Medican",
  basePath: "/studio",
  projectId: projectId || "missing-project-id",
  dataset,
  plugins,
  schema: { types: schemaTypes },
  document: {
    newDocumentOptions: (previous, { creationContext }) => {
      if (creationContext.type === "global") return [];
      return previous.filter((item) => !singletonTypes.has(item.templateId));
    },
    actions: (previous, context) =>
      singletonTypes.has(context.schemaType)
        ? previous.filter(({ action }) => action && ["publish", "discardChanges", "restore"].includes(action))
        : previous,
  },
});

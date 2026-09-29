import { slugify } from "./slugify";

export type Need = { label: string; labelEn: string; treatment: string; serviceSlug: string };
export type NeedGroup = { label: string; labelEn: string; needs: Need[] };

const need = (
  label: string,
  labelEn: string,
  treatment: string,
  serviceSlug: string,
): Need => ({ label, labelEn, treatment, serviceSlug });

/** Patient-facing "needs", each mapped to a real treatment already described on its service page. */
export const NEED_GROUPS: NeedGroup[] = [
  {
    label: "Peau & visage",
    labelEn: "Skin & face",
    needs: [
      need("Traiter les rides", "Treat wrinkles", "Botox", "medecine-esthetique"),
      need("Repulper les lèvres et le visage", "Plump lips and face", "Acide hyaluronique", "medecine-esthetique"),
      need("Effacer les taches, unifier le teint", "Fade dark spots, even skin tone", "Peeling", "medecine-esthetique"),
      need("Illuminer et purifier la peau", "Brighten and cleanse skin", "Hydrafacial", "medecine-esthetique"),
      need("Raffermir et régénérer la peau", "Firm and regenerate skin", "Micro-needling", "medecine-esthetique"),
      need("Épilation définitive", "Permanent hair removal", "Laser", "medecine-esthetique"),
    ],
  },
  {
    label: "Santé au quotidien",
    labelEn: "Everyday health",
    needs: [
      need("Faire un bilan de santé complet", "Get a full health check-up", "Bilans de santé", "medecine-generale"),
      need("Obtenir un certificat médical", "Get a medical certificate", "Certificats médicaux", "medecine-generale"),
      need("Surveiller mon cœur (ECG)", "Monitor my heart (ECG)", "Électrocardiogramme (ECG)", "medecine-generale"),
    ],
  },
  {
    label: "Diabète",
    labelEn: "Diabetes",
    needs: [
      need("Dépister un diabète", "Screen for diabetes", "Dépistage du diabète", "diabetologie"),
      need("Suivre mon diabète au quotidien", "Manage my diabetes day to day", "Suivi diabète type 1 & 2", "diabetologie"),
    ],
  },
  {
    label: "Bien-être",
    labelEn: "Wellness",
    needs: [
      need("Une hijama traditionnelle entre femmes", "Traditional women-only hijama", "Hijama traditionnelle sèche", "hijama"),
    ],
  },
];

export function needHref(need: Need): string {
  return `/services/${need.serviceSlug}#${slugify(need.treatment)}`;
}

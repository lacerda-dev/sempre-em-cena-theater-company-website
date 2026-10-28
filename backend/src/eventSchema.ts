import { z } from "zod";

const dateSchema = z.string().superRefine((value, ctx) => {
  // regex
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);

  if (!match) {
    ctx.addIssue({
      code: "custom",
      message: "A data deve estar no formato DD/MM/AAAA",
    });
    return;
  }

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);

  const date = new Date(year, month - 1, day);

  const isValid =
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day;

  if (!isValid) {
    ctx.addIssue({
      code: "custom",
      message: "A data informada não existe no calendário",
    });
  }
});

export const eventSchema = z.object({
  title: z.string().trim().min(1, "O titulo é obrigatório"),
  description: z.string().nullish().or(z.literal("")),
  event_date: dateSchema.nullish().or(z.literal("")),
  cover_image_url: z.string().nullish().or(z.literal("")),
});

import { router, publicProcedure } from '../trpc';
import { z } from 'zod';

export const userRouter = router({
	all: publicProcedure.query(({ ctx }) => {
		return ctx.prisma.user.findMany();
	}),
	byName: publicProcedure.input(z.string()).query(({ ctx, input }) => {
		return ctx.prisma.user.findFirst({
			where: { name: input },
		});
	}),
	create: publicProcedure
		.input(z.object({ name: z.string(), password: z.string() }))
		.mutation(({ ctx, input }) => {
			return ctx.prisma.user.create({ data: input });
		}),
	updatePreferences: publicProcedure
		.input(
			z.object({
				name: z.string(),
				calories: z.string().optional(),
				calsRemaining: z.string().optional(),
				vegan: z.boolean().optional(),
				vegetarian: z.boolean().optional(),
				pescatarian: z.boolean().optional(),
				keto: z.boolean().optional(),
				dairy: z.boolean().optional(),
				gluten: z.boolean().optional(),
				shellfish: z.boolean().optional(),
				peanuts: z.boolean().optional(),
			})
		)
		.mutation(({ ctx, input }) => {
			return ctx.prisma.user.update({
				where: { name: input.name },
				data: {
					calories: input.calories,
					calsRemaining: input.calsRemaining,
					vegan: input.vegan,
					vegetarian: input.vegetarian,
					pescatarian: input.pescatarian,
					keto: input.keto,
					dairy: input.dairy,
					gluten: input.gluten,
					shellfish: input.shellfish,
					peanuts: input.peanuts,
				},
			});
		}),
});

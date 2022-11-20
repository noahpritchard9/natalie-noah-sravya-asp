import { router, publicProcedure } from '../trpc'
import { z } from 'zod'

export const userRouter = router({
	all: publicProcedure.query(({ ctx }) => {
		return ctx.prisma.user.findMany()
	}),
	byName: publicProcedure.input(z.string()).query(({ ctx, input }) => {
		return ctx.prisma.user.findFirst({
			where: { name: input },
		})
	}),
	create: publicProcedure
		.input(z.object({ name: z.string(), password: z.string() }))
		.mutation(({ ctx, input }) => {
			return ctx.prisma.user.create({ data: input })
		}),
	updatePreferences: publicProcedure
		.input(
			z.object({
				name: z.string(),
				calories: z.string(),
				vegan: z.boolean(),
				vegetarian: z.boolean(),
				pescatarian: z.boolean(),
				keto: z.boolean(),
			})
		)
		.mutation(({ ctx, input }) => {
			return ctx.prisma.user.update({
				where: { name: input.name },
				data: {
					calories: input.calories,
					vegan: input.vegan,
					vegetarian: input.vegetarian,
					pescatarian: input.pescatarian,
					keto: input.keto,
				},
			})
		}),
})

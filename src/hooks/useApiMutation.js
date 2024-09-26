import { useMutation, useQueryClient } from '@tanstack/react-query'

/**
 * For API Mutation with feature: auto invalidate
 */
export function useApiMutation({ queryKey, mutationFn, options }) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    ...options,
  })
}

/**
 * For API Mutation with feature: auto invalidate and auto generated url from query key
 */
export function useApiMutation2({ queryKey, mutationFun, options }) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input) => {
      const url = `${queryKey.join('/')}`
      return mutationFun(url, input)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    ...options,
  })
}

export default useApiMutation

import { ref } from 'vue'
import { useStateEffect } from 'vue-use-state-effect'

export const useSharedState = useStateEffect(() => {
  const state = ref({
    test: '🚀 Initial state value.',
  })
  const updateState: () => void = () => {
    state.value = {
      test: '🌝 Updated state value.',
    }
  }
  return {
    state,
    updateState,
  }
}, { name: 'sharedState', debug: true, destroy: false })
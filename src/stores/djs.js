import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

export const useDjsStore = defineStore('djs', () => {
  const djs = ref([
    {
      id: 'd1',
      artistName: 'Max',
      genres: ['hip-hop', 'pop'],
      description:
        "I'm Max and I've been a DJ for 10 years. It would be amazing to play at your event.",
      hourlyRate: 30,
    },
    {
      id: 'd2',
      artistName: 'Julie',
      genres: ['trap', 'house'],
      description:
        "I am Julie and I love overall eletronic music but know I'm really into trap and house. Looking forward to play at your party.",
      hourlyRate: 30,
    },
  ]);

  const hasDjs = computed(() => {
    return djs.value.length > 0;
  });

  return { djs, hasDjs };
});

export default {};

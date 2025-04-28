<script setup lang="ts">
import Quote from './Quote.vue';
import { Quotes } from '~/constants/quote';
import { ref } from 'vue';

const randomQuote = ref<{ content: string; author: string } | null>(null);

const getRandomQuote = () => {
  const quoteNumber = Quotes.length;
  const randomNumber = Math.floor(Math.random() * quoteNumber);
  randomQuote.value = Quotes[randomNumber];
};

getRandomQuote();
</script>

<template>
  <div v-if="randomQuote">
    <Quote :content="randomQuote.content" :author="randomQuote.author" class="min-h-32"/>
  </div>
</template>

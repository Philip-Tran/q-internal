<script lang="ts" setup>
definePageMeta({
  layout: "plain-layout"
})

import { LampEffect } from '~/components/ui/lamp-effect';

</script>

<template>
  <div>
    <div>
      <LampEffect>
        <div class="flex flex-col space-y-6">
          <div>
            <span class="font-heading text-3xl font-serif text-white">Create a brick megamenu</span>
          </div>
        </div>
      </LampEffect>
      <div class="fixed bottom-7 right-1/2 translate-x-1/2">
        <div class="flex flex-row justify-between space-x-6 opacity-0 hover:opacity-100">
          <Button variant="outline" class="" size="xs">Log Work</Button>
          <Button variant="secondary" class="" size="xs">Pause</Button>
          <Button variant="outline" class="" size="xs">Finish</Button>
        </div>
      </div>
    </div>
  </div>
</template>

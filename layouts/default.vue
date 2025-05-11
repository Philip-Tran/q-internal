<script setup lang="ts">
import { useMyWorkStore } from '#imports'

import { useEventListener, onClickOutside } from '@vueuse/core'
import {
  CreditCard,
  Home,
  Settings,
  Target,
  Workflow,
} from 'lucide-vue-next'

const workStore = useMyWorkStore()
const router = useRouter()
const isCommandVisible = ref(false)
const commandRef = ref<HTMLElement | null>(null)

const toggleCommand = (event: KeyboardEvent) => {
  if (event.ctrlKey && event.key === 'k') {
    event.preventDefault()
    isCommandVisible.value = !isCommandVisible.value
  }
}

const closeCommand = () => {
  isCommandVisible.value = false
}

// Close when clicking outside the command box
onClickOutside(commandRef, () => {
  isCommandVisible.value = false
})

useEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeCommand()
  }
})

onMounted(() => {
  window.addEventListener('keydown', toggleCommand)
})

onUnmounted(() => {
  window.removeEventListener('keydown', toggleCommand)
})

const handleNewWork = () => {
  isCommandVisible.value = false
  workStore.newWorkDialogState.isOpened = true
}

const handleNewOKRs = () => {
  router.push("/new-okrs")
  isCommandVisible.value = false
}

const handleGoHomeCommand = () => {
  isCommandVisible.value = false
  router.push("/")
}

const handleGoSettingCommand = ( ) => {
  isCommandVisible.value  = false
  router.push("/settings")
}

const handleGoModule = ( ) => {
  isCommandVisible.value  = false
  router.push("/module")
}
</script>

<template>
  <div>
    <!-- Header -->
    <AppUiHeader/>

    <div class="default-layout flex-1 px-4 2xl:px-20 pt-6">
      <slot />

      <!-- Command Overlay -->
      <div v-if="isCommandVisible" class="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      <!-- Command Palette -->
      <div v-if="isCommandVisible" class="fixed inset-0 flex items-center justify-center py-12 z-50">
        <Command ref="commandRef" class="rounded-lg border shadow-md max-w-[450px] max-h-[450px]">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Quick actions">
              <CommandItem @select="handleNewWork" value="newWork">
                <Workflow />
                <span>Create new work</span>
              </CommandItem>
              <CommandItem @select="handleNewOKRs" value="openCalendar">
                <Target />
                <span>New OKRs</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Pages">
              <CommandItem @select="handleGoHomeCommand" value="home">
                <Home />
                <span>Home</span>
                <CommandShortcut  >⌘H</CommandShortcut>
              </CommandItem>
              <CommandItem @select="handleGoModule" value="module">
                <CreditCard />
                <span>Module</span>
                <CommandShortcut>M</CommandShortcut>
              </CommandItem>
              <CommandItem @select="handleGoSettingCommand" value="settings">
                <Settings />
                <span>Settings</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Fade-in animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    /* transform: scale(0.95); */
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

.fixed {
  animation: fadeIn 0.15s ease-in-out;
}
</style>

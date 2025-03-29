<script setup lang="ts">
import { useEventListener, onClickOutside } from '@vueuse/core'
import { ref, onMounted, onUnmounted } from 'vue'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'

import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from 'lucide-vue-next'

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
  router.push("/new-work")
}

const router = useRouter()
</script>

<template>
  <div>
    <div class="border-b">
      <div class="flex h-16 items-center px-4 py-3 space-x-8">
        <!-- <TeamSwitcher /> -->
        <RouterLink to="/">
          <div class="text-xl font-md">
            Q Internal
          </div>
        </RouterLink>
        <Separator orientation="vertical" class="w-[2px] h-7"/>
        <AppUiMainNav class="mx-6" />
        <div class="ml-auto flex items-center space-x-4">
          <!-- <Search /> -->
          <!-- <UserNav /> -->
        </div>
      </div>
    </div>
    <div class="default-layout flex-1 space-y-4 p-8 pt-6">
      <slot />
      <!-- Overlay -->
      <div v-if="isCommandVisible" class="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

      <!-- Command Palette -->
      <div v-if="isCommandVisible" class="fixed inset-0 flex items-center justify-center py-12 z-50">
        <Command ref="commandRef" class="rounded-lg border shadow-md max-w-[450px] max-h-[450px] bg-white">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem @select="handleNewWork" value="newWork">
                <Smile />
                <span>New Work</span>
              </CommandItem>
              <CommandItem value="openCalendar">
                <Calendar />
                <span>Open Calendar</span>
              </CommandItem>
              <CommandItem disabled value="calculator">
                <Calculator />
                <span>Calculator</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem value="profile">
                <User />
                <span>Profile</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem value="billing">
                <CreditCard />
                <span>Billing</span>
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem value="settings">
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

<script lang="ts" setup>
import { Home, Settings, FileText, PanelLeft } from 'lucide-vue-next';
import { ref } from 'vue';

// Create a navigation items array
const navItems = [
  { 
    name: 'Home',
    path: '/',
    icon: Home 
  },
  { 
    name: 'New OKRs',
    path: '/new-okrs',
    icon: FileText 
  },
  { 
    name: 'Current Work',
    path: '/current-work',
    icon: PanelLeft 
  },
  { 
    name: 'Settings',
    path: '/settings',
    icon: Settings 
  }
];

// State for hover
const isHovering = ref(false);

// Methods to handle hover state
const showNav = () => {
  isHovering.value = true;
};

const hideNav = () => {
  isHovering.value = false;
};
</script>

<template>
  <div class="plain-layout relative">
    <div @mouseenter="showNav" @mouseleave="hideNav">
      <!-- Navigation panel that shows on hover -->
      <div
        :class="[
          'md:flex lg:absolute z-10 left-6 top-1/2 flex-col border border-gray-800 rounded-xl p-2 space-y-2 min-h-[100px] min-w-[60px] -translate-y-1/2 transition-opacity duration-200',
          isHovering ? 'opacity-100' : 'opacity-0'
        ]"
      >
        <RouterLink 
          v-for="item in navItems" 
          :key="item.path" 
          :to="item.path"
          class="p-3 flex items-center justify-center hover:bg-gray-700 rounded-xl transition-colors"
        >
          <component :is="item.icon" class="w-6 h-6" color="white" />
        </RouterLink>
      </div>
    </div>
    <div class="">
      <slot />
    </div>
  </div>
</template>

<style>
/* Optional: Add a transition for smoother hover effect */
.transition-opacity {
  transition: opacity 0.3s ease;
}
</style>
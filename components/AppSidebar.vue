<script setup lang="ts">
import { authClient } from "../server/utils/auth-client";
import { FetchKeys } from "~/constants/data-key";

import {
  ArrowRight,
  BadgeCheck,
  Calendar,
  ChevronDown,
  ChevronRight,
  ChevronsUpDown,
  Home,
  Inbox,
  LogOut,
  PenLine,
  Projector,
  Search,
  Settings,
  Sparkles,
} from "lucide-vue-next";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Schedule setting",
    url: "/schedule",
    icon: Home,
  },
  {
    title: "Project",
    url: "/project",
    icon: Home,
  },
];

const handleLogout = async () => {};

const { data, refresh, error, status } = await useFetch(`/api/project`, {
  method: "get",
  query: { status: "IN_PROGRESS" },
  key: FetchKeys.PROJECTS_IN_PROGRESS,
});

const onLogout = async () => {
  const res = await authClient.signOut();

  if (res.data?.success) {
    navigateTo("/login");
  }
};
</script>

<template>
  <Sidebar class="border-none" variant="inset" collapsible="icon">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                <span class="font-medium py-4 text-2xl">Q Internal</span>
                <ChevronDown class="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="w-[--radix-popper-anchor-width]">
              <DropdownMenuItem>
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Main</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in items" :key="item.title" class="">
              <SidebarMenuButton asChild class="min-h-10">
                <NuxtLink :to="item.url">
                  <component :is="item.icon" />
                  <span>{{ item.title }}</span>
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <Collapsible defaultOpen class="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    <Projector />
                    <span>Project</span>
                    <ChevronRight
                      class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub class="py-4 pr-0 mr-0">
                    <NuxtLink
                      :to="`/project/${projectItem.id}`"
                      v-if="data?.data && data?.success === true"
                      v-for="projectItem in data?.data"
                      :key="projectItem.id"
                      class="dark:hover:text-white dark:text-muted-foreground transition-all ease-in-out"
                    >
                      <SidebarMenuSubItem
                        class="py-2 px-2 cursor-pointer hover:bg-card rounded-lg"
                      >
                        <span class="truncate text-sm block w-full">
                          {{ projectItem.name }}
                        </span>
                      </SidebarMenuSubItem>
                    </NuxtLink>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <SidebarMenuButton
                size="lg"
                class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar class="h-8 w-8 rounded-lg">
                  <!--  -->
                  <AvatarFallback class="rounded-lg"> CN </AvatarFallback>
                </Avatar>
                <div class="grid flex-1 text-left text-sm leading-tight">
                  <span class="truncate font-semibold"> </span>
                  <span class="truncate text-xs"></span>
                </div>
                <ChevronsUpDown class="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side="bottom"
              align="end"
              :side-offset="4"
            >
              <DropdownMenuLabel class="p-0 font-normal">
                <div
                  class="flex items-center gap-2 px-1 py-1.5 text-left text-sm"
                >
                  <Avatar class="h-8 w-8 rounded-lg">
                    <!-- <AvatarImage :src="user.avatar" :alt="user.name" /> -->
                    <AvatarFallback class="rounded-lg"> CN </AvatarFallback>
                  </Avatar>
                  <div class="grid flex-1 text-left text-sm leading-tight">
                    <span class="truncate font-semibold"></span>
                    <span class="truncate text-xs"> </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <NuxtLink to="/settings">
                  <DropdownMenuItem>
                    <Settings />
                    Settings
                  </DropdownMenuItem>
                </NuxtLink>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button
                  variant="link"
                  class="w-full p-0 justify-start py-0 h-min"
                  @click="handleLogout"
                >
                  <LogOut />
                  <span @click="onLogout">Log out</span>
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</template>

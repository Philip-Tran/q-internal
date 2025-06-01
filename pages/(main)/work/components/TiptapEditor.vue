<script setup>
import { cn } from "@/lib/utils";
import {
  Code,
  Eraser,
  ListCollapse,
  ListEnd,
  Pilcrow,
  Redo2,
  RemoveFormatting,
  RemoveFormattingIcon,
  SquareCheck,
  Undo2,
  WrapText,
  Youtube,
} from "lucide-vue-next";

const props = defineProps({
  modelValue: String,
  class: {
    type: String,
  },
  editorClass: {
    type: String,
  },
  isButtonVisible: {
    type: Boolean,
  },
});

const emit = defineEmits(["update:modelValue"]);

const editor = useEditor({
  content: props.modelValue,
  onUpdate: ({ editor }) => {
    emit("update:modelValue", editor.getHTML());
  },
  extensions: [
    TiptapStarterKit,
    TiptapTaskList,
    TiptapListItem,
    TiptapTaskItem.configure({
      nested: true,
    }),
    TiptapYoutube.configure({
      controls: true,
      nocookie: true,
      allowFullscreen: true,
      modestBranding: true,
    }),
    TiptapCodeBlock.configure({
      // defaultLanguage: 'javascript',
    }),
  ],

  editorProps: {
    attributes: {
      spellcheck: "true",
      class: cn(
        "prose w-full xl:w-[1000px] max-w-full text-sm w-[100%] p-6 pb-12 mx-0 leading-8 lg:leading-relaxed text-grey-700 prose-sm prose-h1:font-sans prose-h2:font-sans prose-h3:font-sans prose-h4:font-sans prose-h5:font-sans min-h-60 overflow-y-auto focus:outline-none",
        props.editorClass
      ),
    },
    transformPastedText(text) {
      return text;
    },
  },
});

const addVideo = () => {
  const url = prompt("Enter YouTube URL");
  if (!url || !editor.value) return;

  editor.value.commands.setYoutubeVideo({
    src: url,
    width: 650,
    height: 365,
  });
};

onBeforeUnmount(() => {
  unref(editor).destroy();
});
</script>

<template>
  <div :class="cn('', props.class)">
    <div
      v-if="editor && isButtonVisible"
      class="flex flex-wrap space-x-2 px-6 py-1 border-y-slate-400 border-b border-b-slate-50"
    >
      <Button
        size="icon"
        variant="ghost"
        class="tiptap-btn"
        @click="editor.chain().focus().undo().run()"
        :disabled="!editor.can().chain().focus().undo().run()"
      >
        <Undo2 />
      </Button>

      <Button
        class="tiptap-btn"
        variant="ghost"
        size="icon"
        @click="editor.chain().focus().redo().run()"
        :disabled="!editor.can().chain().focus().redo().run()"
      >
        <Redo2 />
      </Button>

      <Button
        class="tiptap-btn"
        variant="ghost"
        size="icon"
        @click="editor.chain().focus().toggleTaskList().run()"
        :class="{ 'is-active': editor.isActive('taskList') }"
      >
        <SquareCheck class="w-5 h-5 text-gray-800" />
      </Button>

      <Button
        class="tiptap-btn"
        variant="ghost"
        size="icon"
        @click="editor.chain().focus().sinkListItem('taskItem').run()"
        :disabled="!editor.can().sinkListItem('taskItem')"
      >
        <ListCollapse class="w-5 h-5" />
      </Button>

      <Button
        class="tiptap-btn"
        variant="ghost"
        size="icon"
        @click="editor.chain().focus().liftListItem('taskItem').run()"
        :disabled="!editor.can().liftListItem('taskItem')"
      >
        <ListEnd class="w-5 h-5" />
      </Button>

      <Button variant="ghost" size="icon" @click="addVideo" class="tiptap-btn">
        <Youtube class="w-5 h-5" />
      </Button>

      <Button
        class="tiptap-btn"
        variant="ghost"
        size="icon"
        @click="editor.chain().focus().setParagraph().run()"
        :class="{ 'is-active': editor.isActive('paragraph') }"
      >
        <Pilcrow />
      </Button>

      <Button
        class="tiptap-btn"
        variant="ghost"
        size="icon"
        @click="editor.chain().focus().toggleCode().run()"
        :disabled="!editor.can().chain().focus().toggleCode().run()"
        :class="{ 'is-active': editor.isActive('code') }"
      >
        <Code />
      </Button>

      <Button
        class="tiptap-btn"
        variant="ghost"
        size="icon"
        @click="editor.chain().focus().setHardBreak().run()"
      >
        <WrapText />
      </Button>

      <Button
        class="tiptap-btn"
        variant="ghost"
        size="icon"
        @click="editor.chain().focus().clearNodes().run()"
      >
        <RemoveFormatting />
      </Button>

      <Button
        class="tiptap-btn"
        variant="ghost"
        size="default"
        @click="editor.chain().focus().unsetAllMarks().run()"
      >
        <Eraser />
      </Button>

      <!-- <Button class="tiptap-btn" @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'is-active': editor.isActive('orderedList') }">
        ordered list
      </Button> -->

      <!-- <Button class="tiptap-btn" @click="editor.chain().focus().toggleCodeBlock().run()"
        :class="{ 'is-active': editor.isActive('codeBlock') }">
        code block
      </Button> -->
    </div>

    <ScrollArea class="h-[500px]">
      <TiptapEditorContent :editor="editor" />
    </ScrollArea>
  </div>
</template>

<style lang="scss">
.tiptap {
  &:first-child {
    margin-top: 0;
  }

  pre {
    code {
      @apply text-base text-white font-medium;
    }
  }

  ul,
  ol {
    padding: 0 1rem;
    margin: 1.25rem 1rem 1.25rem 0.4rem;

    li p {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
    }
  }

  ul[data-type="taskList"] {
    list-style: none;
    margin-left: 0;
    padding: 0;

    li {
      align-items: center;
      display: flex;

      > label {
        flex: 0 0 auto;
        margin-right: 0.5rem;
        user-select: none;
        align-items: center;

        input {
          margin: auto auto;
        }
      }

      > div {
        flex: 1 1 auto;
      }
    }

    input[type="checkbox"] {
      cursor: pointer;
    }

    ul[data-type="taskList"] {
      margin: 0;
    }
  }
}

/* Add Button styles */
.tiptap-btn {
  color: black;

  &.is-active {
    @apply bg-slate-50;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>

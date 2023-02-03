import "./style.css";
import "./editor/ace.js";
import "./editor/theme-twilight.js";
import { OpenFile } from "../wailsjs/go/main/App";
import { SaveFile } from "./../wailsjs/go/main/App";

const fileInput: HTMLInputElement | null =
  document.querySelector<HTMLInputElement>("#file-input");
const saveInput: HTMLInputElement | null =
  document.querySelector<HTMLInputElement>("#file-save-input");

const editor = ace.edit("editor");
editor.setTheme("ace/theme/twilight");
editor.session.setMode("ace/mode/javascript");

document.onkeydown = (event: KeyboardEvent) => {
  if (event.ctrlKey && event.key === "o") {
    event.preventDefault();
    toggleOpenInput();
  }
  if (event.ctrlKey && event.key === "s") {
    event.preventDefault();
    toggleSaveInput();
  }
};

const toggleOpenInput = () => {
  if (fileInput) {
    if (fileInput.style.display === "block") {
      fileInput.style.display = "none";
    } else {
      fileInput.style.display = "block";
      fileInput.focus();
    }
  }
};

const toggleSaveInput = () => {
  if (saveInput) {
    if (saveInput.style.display === "block") {
      saveInput.style.display = "none";
    } else {
      saveInput.style.display = "block";
      saveInput.value = fileInput?.value || "";
      saveInput.focus();
    }
  }
};

fileInput?.addEventListener("keydown", (e: KeyboardEvent) => {
  if (e.key === "Enter") {
    // have double quotes
    if (fileInput.value) {
      if (
        fileInput.value[0] === '"' &&
        fileInput.value[fileInput.value.length - 1] === '"'
      ) {
        fileInput.value = fileInput.value.slice(1, -1);
      }
    }

    // open file
    OpenFile(fileInput.value)
      .then((contents) => {
        editor.session.setValue(contents);
        editor.focus();
      })
      .finally(() => {
        toggleOpenInput();
      });
  }
});

saveInput?.addEventListener("keydown", (e: KeyboardEvent) => {
  if (e.key === "Enter") {
    if (saveInput.value) {
      if (
        saveInput.value[0] === '"' &&
        saveInput.value[saveInput.value.length - 1] === '"'
      ) {
        saveInput.value = saveInput.value.slice(1, -1);
      }
    }
  }

  SaveFile(saveInput.value, editor.session.getValue()).then((isSaved) => {
    console.log("Is file saved: ", isSaved);
    toggleSaveInput();
  });
});

// editor configuration
editor.setFontSize("25px");

let current_Pen_Color = "#000000";
let current_Size = 16;
let current_Mode = "color";

function change_Pen_Color(new_Color) {
  current_Pen_Color = new_Color;
}

function change_Mode(new_Mode) {
  current_Mode = new_Mode;
}

function change_size(new_Size) {
  current_Size = new_Size;
}

const color_input = document.getElementById("color_input");
const pen_input = document.getElementById("pen_btn");
const eraser_input = document.getElementById("eraser_btn");
const random_input = document.getElementById("random_btn");
const reset_input = document.getElementById("reset_btn");

const slider_input = document.getElementById("slider_input");
const slider_text = document.getElementById("slider_text");
const canvas = document.getElementById("canvas");

let mouseDown = false;
document.body.onpointerdown = () => (mouseDown = true);
document.body.onpointerup = () => (mouseDown = false);

pen_input.onclick = () => change_Mode('color');
eraser_input.onclick = () => change_Mode('eraser');
random_input.onclick = () => change_Mode('random');

slider_input.onmousemove = (e) => change_Size_Text(e.target.value);
slider_input.onchange = (e) => change_Canvas_size(e.target.value);

color_input.oninput = (e) => change_Pen_Color(e.target.value);

reset_btn.onclick = () => refresh_Canvas();

function create_canvas(size) {
  canvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  canvas.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("canvas_square");
    square.addEventListener("pointerover", draw);
    square.addEventListener("pointerdown", draw);
    canvas.appendChild(square);
  }
}

function change_Canvas_size(size) {
  change_size(size);
  change_Size_Text(size);
  refresh_Canvas();
}

function change_Size_Text(value) {
  slider_text.innerHTML = `${value} x ${value}`;
}

function refresh_Canvas() {
  clear_Canvas();
  create_canvas(current_Size);
}

function clear_Canvas() {
  canvas.innerHTML = "";
}

function draw(e) {
  if (e.type === "pointerover" && !mouseDown) return;
  if (current_Mode === "random") {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
  } else if (current_Mode === "color") {
    e.target.style.backgroundColor = current_Pen_Color;
  } else if (current_Mode === "eraser") {
    e.target.style.backgroundColor = "#FFFFFF";
  }
}

window.onload = () => {
  create_canvas(slider_input.value);
};

images = [
  {name: "alpaca"},
  {name: "bear"},
  {name: "corgi"},
  {name: "fish"},
  {name: "fox"},
  {name: "hornet"},
  {name: "platypus"},
  {name: "red_panda"}
  ]

images.each do |image|
  Image.create(image)
end

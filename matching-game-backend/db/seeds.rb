images = [
  {name: "alpaca"},
  {name: "fish"},
  {name: "fox"},
  {name: "frog"},
  {name: "hornet"},
  {name: "platypus"},
  {name: "red_panda"},
  {name: "stingray"}
  ]

images.each do |image|
  Image.create(image)
end

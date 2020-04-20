images = [
  {name: "bear"},
  {name: "corgi"},
  {name: "fish"},
  {name: "hornet"}
  ]

images.each do |image|
  Image.create(image)
end

cards = [
  {name: "bear"},
  {name: "corgi"},
  {name: "fish"},
  {name: "hornet"}
  ]

cards.each do |card|
  Card.create(card)
end

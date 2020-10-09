require 'rails_helper'

RSpec.describe User, :type => :model do
  let(:user) {
    User.create(
      :username => "trish"
    )
  }

  it "is valid with an username" do
    expect(user).to be_valid
  end

  it "is not valid without a username" do
    # TODO: show an alert on front end if user doesn't fill out name
    expect(User.new).not_to be_valid
  end

end

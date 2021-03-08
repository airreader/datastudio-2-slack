function getPostSlackConfigsByGmailAddress(currentUserEmailAddress) {
  return getLinkageConfig().filter((config) => {
    if(!currentUserEmailAddress) { return true };
    return config.ownerEmailAddress === currentUserEmailAddress
  })
}

// utils/repositoryHandler.js
import Repository from '../models/Repository.js';
import User from '../models/User.js';

const addOrUpdateRepository = async (repoInfo, ownerName) => {
  const { repoId, name } = repoInfo;
  let repository = await Repository.findOne({ repoId });

  if (!repository) {
    // Find or create the user
    let user = await User.findOne({ githubUsername: ownerName });
    if (!user) {
      user = new User({ githubUsername: ownerName });
      await user.save();
    }

    repository = new Repository({ repoId, name, ownerName, owner: user._id });
    await repository.save();

    // Associate repository with user
    user.repositories.push(repository._id);
    await user.save();
  } else {
    // Update repository name if it has changed
    repository.name = name;
    await repository.save();
  }

  return repository._id;
};

export default addOrUpdateRepository;

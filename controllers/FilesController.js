import dbClient from '../utils/db';

export default class FilesController {
  static async postUpload(req, res) {
    const { user } = req;

    // Check if user is authenticated
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Get file attributes from the request body
    const { name, type, parentId = 0, isPublic = false, data } = req.body;

    // Validate required attributes
    if (!name) {
      return res.status(400).json({ error: 'Missing name' });
    }
    if (!type || !['folder', 'file', 'image'].includes(type)) {
      return res.status(400).json({ error: 'Missing or invalid type' });
    }
    if (type !== 'folder' && !data) {
      return res.status(400).json({ error: 'Missing data' });
    }

    // Check if parentId exists and is a folder
    if (parentId !== 0) {
      const parentFile = await dbClient.filesCollection().findOne({ _id: parentId });
      if (!parentFile || parentFile.type !== 'folder') {
        return res.status(400).json({ error: 'Parent not found or is not a folder' });
      }
    }

    // Create the new file document
    const newFile = {
      userId: user._id,
      name,
      type,
      parentId,
      isPublic,
    };

    // If type is not 'folder', save the file locally
    if (type !== 'folder') {
      // Save the file locally and set the 'localPath' attribute
      // You'll need to implement this part based on your server's file storage logic
      // Example: Save the file in '/tmp/files_manager' with a unique filename
      // Replace this part with your actual file storage logic
      const localPath = '/tmp/files_manager/' + generateUniqueFilename(); // Implement 'generateUniqueFilename'
      // Save 'data' to 'localPath'

      // Set the 'localPath' attribute in the newFile document
      newFile.localPath = localPath;
    }

    // Insert the new file document into the 'files' collection
    const result = await dbClient.filesCollection().insertOne(newFile);

    // Return the newly created file with a status code of 201
    return res.status(201).json(result.ops[0]);
  }
}

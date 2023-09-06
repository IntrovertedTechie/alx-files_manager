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
      // Implement 'generateUniqueFilename' to generate a unique filename for the file
      const uniqueFilename = generateUniqueFilename(); // Implement this function

      // Implement logic to save 'data' to a file with the generated 'uniqueFilename'
      const localPath = '/tmp/files_manager/' + uniqueFilename; // Replace with your file storage logic

      // Set the 'localPath' attribute in the newFile document
      newFile.localPath = localPath;
    }

    // Insert the new file document into the 'files' collection
    const result = await dbClient.filesCollection().insertOne(newFile);

    // Return the newly created file with a status code of 201
    return res.status(201).json(result.ops[0]);
  }
}

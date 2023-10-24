const {Router} = require('express')
const upload = require('../configMulter.js')
const pool = require('../configDB.js')
const router = Router()


router.post('/create', upload.array('images', 10), async (req, res) => {
  const { uid, name, description, phone, emailSpace } = req.body;
  console.log(req.body);
  console.log(req.files);

  try {
    // Insertamos la información en la tabla 'spaces'
    const spaceResult = await pool.query(
      'INSERT INTO spaces (uid, name, description, phone, emailSpace) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [uid, name, description, phone, emailSpace]
    );

    // Procesamos las imágenes y las guardamos en la tabla 'photos'
    for (const file of req.files) {
      const imgpath = `uploads/${file.filename}`;

      const photoResult = await pool.query(
        'INSERT INTO photos (uid, imgpath) VALUES ($1, $2) RETURNING *',
        [uid, imgpath]    
      );

      console.log(spaceResult);
      // Puedes usar photoResult.rows[0] para obtener la información de la foto recién creada si es necesario
    }

    res.status(201).json({ success: true, space: spaceResult.rows[0] });
  } catch (error) {
    console.error('Error al insertar espacio:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});

router.get('/', (req, res) => {
  const query = `
    SELECT 
      spaces.*, 
      array_agg(photos.imgpath) as images 
    FROM spaces 
    LEFT JOIN photos ON spaces.uid = photos.uid 
    GROUP BY spaces.uid;
  `;

  pool.query(query, (error, result) => {
    if (error) {
      console.error('Error al obtener los espacios:', error);
      res.status(500).send('Error interno del servidor');
    } else {
      const spaces = result.rows;
      res.json(spaces);
    }
  });
});


router.get('/:uid', async (req, res) => {
  const { uid } = req.params;

  try {
    const spaceResult = await pool.query(
      `SELECT 
          spaces.*, 
          ARRAY_AGG(photos.imgpath) AS images 
        FROM 
          spaces 
        LEFT JOIN 
          photos ON spaces.uid = photos.uid 
        WHERE 
          spaces.uid = $1 
        GROUP BY 
          spaces.uid`,
      [uid]
    );

    if (spaceResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Espacio no encontrado' });
    }

    const spaceWithImages = spaceResult.rows[0];

    res.json( spaceWithImages );
  } catch (error) {
    console.error('Error al obtener espacio por UID:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});


router.delete('/update/:uid', async (req, res) => {
    const {uid} = req.params;
  
    try {
      const result = await pool.query('DELETE FROM spaces WHERE uid = $1 RETURNING *', [uid]);
  
      if (result.rows.length === 0) {
        res.status(404).json({ success: false, message: 'Espacio no encontrado' });
      } else {
        res.json({ success: true, deletedSpace: result.rows[0] });
      }
    } catch (error) {
      console.error('Error al borrar espacio por ID:', error);
      res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
  });


router.delete('/delete/:uid', async (req, res) => {
    const id = req.params.id;
  
    try {
      const result = await pool.query('DELETE FROM spaces WHERE uid = $1 RETURNING *', [uid]);
  
      if (result.rows.length === 0) {
        res.status(404).json({ success: false, message: 'Espacio no encontrado' });
      } else {
        res.json({ success: true, deletedSpace: result.rows[0] });
      }
    } catch (error) {
      console.error('Error al borrar espacio por ID:', error);
      res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
  });


  // Supongamos que tienes una ruta como '/api/check-space/:uid' para verificar si un espacio está asociado con un UID.
router.get('/check-space/:uid', async (req, res) => {
  const {uid} = req.params;
  console.log(uid)
  try {
    const result = await pool.query('SELECT * FROM spaces WHERE uid = $1', [uid]);
    console.log(result.rows)
    if (result.rows.length > 0) {
      console.log(' true')
      res.json(true);
    } else {
      console.log(' false')
      res.json(false );
    }
  } catch (error) {
    console.error('Error al verificar el espacio:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});

router.delete('/delete-image', async (req, res) => {
  const { imgpath } = req.body;

  try {
    const result = await pool.query('DELETE FROM photos WHERE imgpath = $1 RETURNING *', [imgpath]);

    if (result.rows.length === 0) {
      res.status(404).json({ success: false, message: 'Imagen no encontrada' });
    } else {
      res.json({ success: true, deletedImage: result.rows[0] });
    }
  } catch (error) {
    console.error('Error al borrar imagen por imgpath:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});


// Ruta para actualizar un espacio
router.post('/update-space', upload.array('images', 10), async (req, res) => {
  const { uid, name, description, phone, emailSpace } = req.body;

  try {
    // Verificar si el espacio existe
    const spaceCheck = await pool.query('SELECT * FROM spaces WHERE uid = $1', [uid]);

    if (spaceCheck.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Espacio no encontrado' });
    }

    // Actualizar la información del espacio
    const spaceResult = await pool.query(
      'UPDATE spaces SET name = $2, description = $3, phone = $4, emailSpace = $5 WHERE uid = $1 RETURNING *',
      [uid, name, description, phone, emailSpace]
    );

    // Procesar imágenes para agregar
    for (const file of req.files) {
      const imgpath = `uploads/${file.filename}`;

      const photoResult = await pool.query(
        'INSERT INTO photos (uid, imgpath) VALUES ($1, $2) RETURNING *',
        [uid, imgpath]
      );

      // Puedes usar photoResult.rows[0] para obtener la información de la foto recién creada si es necesario
    }

    // Procesar imágenes para borrar
    const imagesToDelete = req.body.imagesDelete || [];
    for (const imgpath of imagesToDelete) {
      await pool.query('DELETE FROM photos WHERE imgpath = $1 AND uid = $2', [imgpath, uid]);
    }

    res.status(200).json({ success: true, space: spaceResult.rows[0] });
  } catch (error) {
    console.error('Error al actualizar espacio:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});

module.exports = router;


  
  

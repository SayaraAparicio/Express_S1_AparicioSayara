const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de la base de datos
const uri = 'mongodb+srv://sayaraaparicio07:tKDd6B56ULxRqXY6@cluster0.qs5meyc.mongodb.net/';
const dbName = 'CampusLands';
const collectionName = 'campers';


let db, collection;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== FUNCIÓN PARA CONECTAR A MONGODB =====
async function conectarDB() {
    try {
        console.log('🔄 Conectando a MongoDB...');
        const client = new MongoClient(uri);
        await client.connect();

        db = client.db(dbName);
        collection = db.collection(collectionName);

        console.log('✅ Conexión exitosa a MongoDB');
        console.log(`📊 Base de datos: ${dbName}`);
        console.log(`📦 Colección: ${collectionName}`);
        return true;
    } catch (error) {
        console.error('❌ Error conectando a MongoDB:', error.message);
        return false;
    }
}

// ===== RUTA DE BIENVENIDA =====
app.get('/', (req, res) => {
    res.json({
        message: '🏕️ Bienvenido al CRUD de Campers',
        version: '1.0.0',
        endpoints: {
            'GET /campers': 'Obtener todos los campers',
            'GET /campers/:id': 'Obtener camper por ID',
            'POST /campers': 'Crear nuevo camper',
            'PUT /campers/:id': 'Actualizar camper',
            'DELETE /campers/:id': 'Eliminar camper'
        },
        timestamp: new Date().toISOString()
    });
});

// ===== OBTENER TODOS LOS CAMPERS =====
app.get('/campers', async (req, res) => {
    try {
        console.log('📋 Obteniendo lista de campers...');
        const campers = await collection.find({}).sort({ fechaCreacion: -1 }).toArray();
        
        console.log(`✅ Encontrados ${campers.length} campers`);
        
        res.json({
            success: true,
            total: campers.length,
            data: campers
        });

    } catch (error) {
        console.error('❌ Error obteniendo campers:', error.message);
        res.status(500).json({ 
            success: false,
            error: 'Error interno del servidor',
            message: error.message 
        });
    }
});

// ===== OBTENER CAMPER POR ID =====
app.get('/campers/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`🔍 Buscando camper con ID: ${id}`);

        if (!ObjectId.isValid(id)) {
            console.log('❌ ID no válido');
            return res.status(400).json({ 
                success: false,
                error: 'ID no válido' 
            });
        }

        const camper = await collection.findOne({ _id: new ObjectId(id) });

        if (!camper) {
            console.log('❌ Camper no encontrado');
            return res.status(404).json({ 
                success: false,
                error: 'Camper no encontrado' 
            });
        }

        console.log(`✅ Camper encontrado: ${camper.nombre} ${camper.apellido}`);
        res.json({
            success: true,
            data: camper
        });

    } catch (error) {
        console.error('❌ Error obteniendo camper:', error.message);
        res.status(500).json({ 
            success: false,
            error: 'Error interno del servidor',
            message: error.message 
        });
    }
});

// ===== CREAR CAMPER =====
app.post('/campers', async (req, res) => {
    try {
        const { nombre, apellido, edad, email, ruta } = req.body;
        console.log('➕ Creando nuevo camper...');
        console.log(`📝 Datos: ${nombre} ${apellido}, ${email}`);

        // Validaciones básicas
        if (!nombre || !apellido || !email || !ruta) {
            console.log('❌ Faltan campos obligatorios');
            return res.status(400).json({ 
                success: false,
                error: 'Los campos nombre, apellido, email y ruta son obligatorios' 
            });
        }

        const nuevoCamper = {
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            edad: parseInt(edad) || 0,
            email: email.trim().toLowerCase(),
            ruta: ruta.trim(),
            fechaCreacion: new Date()
        };

        const resultado = await collection.insertOne(nuevoCamper);
        
        console.log(`✅ Camper creado con ID: ${resultado.insertedId}`);
        
        res.status(201).json({ 
            success: true,
            message: 'Camper creado exitosamente',
            id: resultado.insertedId,
            data: nuevoCamper
        });

    } catch (error) {
        console.error('❌ Error creando camper:', error.message);
        res.status(500).json({ 
            success: false,
            error: 'Error interno del servidor',
            message: error.message 
        });
    }
});

// ===== ACTUALIZAR CAMPER =====
app.put('/campers/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, edad, email, ruta } = req.body;
        
        console.log(`📝 Actualizando camper con ID: ${id}`);

        if (!ObjectId.isValid(id)) {
            console.log('❌ ID no válido');
            return res.status(400).json({ 
                success: false,
                error: 'ID no válido' 
            });
        }

        // Validaciones básicas
        if (!nombre || !apellido || !email || !ruta) {
            console.log('❌ Faltan campos obligatorios');
            return res.status(400).json({ 
                success: false,
                error: 'Los campos nombre, apellido, email y ruta son obligatorios' 
            });
        }

        const datosActualizados = {
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            edad: parseInt(edad) || 0,
            email: email.trim().toLowerCase(),
            ruta: ruta.trim(),
            fechaActualizacion: new Date()
        };

        const resultado = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: datosActualizados }
        );

        if (resultado.matchedCount === 0) {
            console.log('❌ Camper no encontrado');
            return res.status(404).json({ 
                success: false,
                error: 'Camper no encontrado' 
            });
        }

        console.log(`✅ Camper actualizado: ${nombre} ${apellido}`);
        
        res.json({ 
            success: true,
            message: 'Camper actualizado exitosamente',
            modified: resultado.modifiedCount > 0
        });

    } catch (error) {
        console.error('❌ Error actualizando camper:', error.message);
        res.status(500).json({ 
            success: false,
            error: 'Error interno del servidor',
            message: error.message 
        });
    }
});

// ===== ELIMINAR CAMPER =====
app.delete('/campers/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`🗑️ Eliminando camper con ID: ${id}`);

        if (!ObjectId.isValid(id)) {
            console.log('❌ ID no válido');
            return res.status(400).json({ 
                success: false,
                error: 'ID no válido' 
            });
        }

        // Primero obtener los datos del camper para mostrar información
        const camper = await collection.findOne({ _id: new ObjectId(id) });
        
        if (!camper) {
            console.log('❌ Camper no encontrado');
            return res.status(404).json({ 
                success: false,
                error: 'Camper no encontrado' 
            });
        }

        const resultado = await collection.deleteOne({ _id: new ObjectId(id) });

        if (resultado.deletedCount === 0) {
            console.log('❌ No se pudo eliminar el camper');
            return res.status(404).json({ 
                success: false,
                error: 'No se pudo eliminar el camper' 
            });
        }

        console.log(`✅ Camper eliminado: ${camper.nombre} ${camper.apellido}`);
        
        res.json({ 
            success: true,
            message: 'Camper eliminado exitosamente',
            deletedCamper: {
                id: camper._id,
                nombre: `${camper.nombre} ${camper.apellido}`,
                email: camper.email
            }
        });

    } catch (error) {
        console.error('❌ Error eliminando camper:', error.message);
        res.status(500).json({ 
            success: false,
            error: 'Error interno del servidor',
            message: error.message 
        });
    }
});

// ===== RUTA PARA ESTADÍSTICAS =====
app.get('/stats', async (req, res) => {
    try {
        console.log('📊 Calculando estadísticas...');
        
        const totalCampers = await collection.countDocuments();
        const campers = await collection.find({}).toArray();
        
        // Calcular estadísticas
        const rutas = [...new Set(campers.map(c => c.ruta))];
        const edades = campers.map(c => c.edad).filter(e => e > 0);
        const promedioEdad = edades.length > 0 ? 
            Math.round(edades.reduce((a, b) => a + b, 0) / edades.length) : 0;

        const stats = {
            totalCampers,
            totalrutas: rutas.length,
            promedioEdad,
            rutas: rutas,
            campersPorruta: {}
        };

        // Contar campers por ruta
        rutas.forEach(ruta => {
            stats.campersPorruta[ruta] = campers.filter(c => c.ruta === ruta).length;
        });

        console.log(`✅ Estadísticas calculadas: ${totalCampers} campers, ${rutas.length} rutas`);
        
        res.json({
            success: true,
            data: stats
        });

    } catch (error) {
        console.error('❌ Error calculando estadísticas:', error.message);
        res.status(500).json({ 
            success: false,
            error: 'Error interno del servidor',
            message: error.message 
        });
    }
});

// ===== MANEJO DE ERRORES =====
app.use((error, req, res, next) => {
    console.error('❌ Error no manejado:', error);
    res.status(500).json({ 
        success: false,
        error: 'Error interno del servidor' 
    });
});

// Ruta 404 - debe ir al final de todas las rutas
app.use((req, res) => {
    console.log(`❓ Ruta no encontrada: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ 
        success: false,
        error: 'Ruta no encontrada',
        availableEndpoints: [
            'GET /',
            'GET /campers',
            'GET /campers/:id',
            'POST /campers',
            'PUT /campers/:id',
            'DELETE /campers/:id',
            'GET /stats'
        ]
    });
});

// ===== INICIAR SERVIDOR =====
async function iniciarServidor() {
    console.log('🚀 Iniciando servidor CRUD de Campers...\n');
    
    const conectado = await conectarDB();

    if (!conectado) {
        console.error('\n❌ No se pudo conectar a MongoDB');
        console.log('\n📝 Para solucionarlo:');
        console.log('1. Verifica tu conexión a internet');
        console.log('2. Asegúrate de que la URL de MongoDB sea correcta');
        console.log('3. Si usas MongoDB Atlas, verifica que tu IP esté en la whitelist');
        console.log('\n🌐 Para MongoDB Atlas:');
        console.log('• Ve a https://mongodb.com/atlas');
        console.log('• Crea una cuenta gratuita');
        console.log('• Crea un cluster gratuito');
        console.log('• Obtén tu string de conexión\n');
        process.exit(1);
    }

    app.listen(PORT, () => {
        console.log('\n🎉 ¡Servidor iniciado exitosamente!');
        console.log('═══════════════════════════════════');
        console.log(`🌐 URL: http://localhost:${PORT}`);
        console.log(`📡 Puerto: ${PORT}`);
        console.log(`📊 Base de datos: ${dbName}`);
        console.log(`📦 Colección: ${collectionName}`);
        console.log('═══════════════════════════════════');
        console.log('\n📝 Endpoints disponibles:');
        console.log(`• GET    http://localhost:${PORT}/           - Info del API`);
        console.log(`• GET    http://localhost:${PORT}/campers    - Ver todos los campers`);
        console.log(`• GET    http://localhost:${PORT}/campers/ID - Ver camper específico`);
        console.log(`• POST   http://localhost:${PORT}/campers    - Crear camper`);
        console.log(`• PUT    http://localhost:${PORT}/campers/ID - Actualizar camper`);
        console.log(`• DELETE http://localhost:${PORT}/campers/ID - Eliminar camper`);
        console.log(`• GET    http://localhost:${PORT}/stats      - Estadísticas`);
        console.log('\n💡 Ejemplos de uso:');
        console.log('curl http://localhost:3000/');
        console.log('curl http://localhost:3000/campers');
        console.log('curl -X POST http://localhost:3000/campers -H "Content-Type: application/json" -d \'{"nombre":"Juan","apellido":"Pérez","edad":20,"email":"juan@email.com","ruta":"Desarrollo Web"}\'');
        console.log('\n✅ Servidor listo para recibir peticiones');
    });
}

// Manejo de cierre del servidor
process.on('SIGINT', () => {
    console.log('\n\n🛑 Cerrando servidor...');
    console.log('👋 ¡Gracias por usar CRUD de Campers!');
    process.exit(0);
});

// Manejo de errores no capturados
process.on('uncaughtException', (error) => {
    console.error('❌ Error no capturado:', error.message);
    process.exit(1);
});

process.on('unhandledRejection', (error) => {
    console.error('❌ Promesa rechazada:', error.message);
    process.exit(1);
});

// ===== INICIAR LA APLICACIÓN =====
iniciarServidor().catch((error) => {
    console.error('❌ Error iniciando el servidor:', error.message);
    process.exit(1);
});
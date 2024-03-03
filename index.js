const path = require('path');
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set(path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({
    extended: true
})) // for parsing application/x-www-form-urlencoded

const data = [{
        name: 'Penggorok Daun',
        gejala: ['Daun menguning', 'Bintik putih pada tanaman', 'Adanya alur berliku bekas kotoran berwarna putih'],
        solusi: 'Penggunaan Fungisida: Penggunaan fungisida yang direkomendasikan dapat membantu mengendalikan pertumbuhan jamur penyebab penyakit. Pastikan untuk mengikuti petunjuk pemakaian dengan benar dan menggunakan fungisida yang sesuai untuk jenis penyakit yang dihadapi.',
        maxPoints: 3,
        point: []
    },
    {
        name: 'Thrips',
        gejala: ['Pucuk dan tunas-tunas samping berwarna keperak-perakan', 'Daun menguning', 'Serangan pada daun bagian bawah/seluruh daun'],
        solusi: 'Pengendalian Hama Secara Fisik: Gunakan alat seperti selang air dengan tekanan rendah untuk menyemprotkan air ke tanaman dan menghilangkan thrips secara fisik dari permukaan daun. Gunakan pula alat seperti lembaran warna biru atau kuning yang dilapisi lem untuk menarik thrips dan menangkap mereka.',
        maxPoints: 3,
        point: []
    },
    {
        name: 'Karat Putih',
        gejala: ['Serangan pada daun bagian bawah/seluruh daun', 'Daun kerdil', 'Daun cekung dan rapuh', 'Permukaan daun bagian bawah berbintik coklat'],
        solusi: 'Pemantauan Rutin: Lakukan pemantauan rutin terhadap tanaman untuk mendeteksi tanda-tanda awal infeksi karat putih. Dengan mengidentifikasi infeksi secara dini, Anda dapat mengambil tindakan lebih cepat untuk mengendalikan penyebaran penyakit.',
        maxPoints: 4,
        point: []
    },
    {
        name: 'Layu Fusarium',
        gejala: ['Bercak coklat pada daun', 'Pertumbuhan bagian atas tanaman terhambat atau mati', 'Daun layu dan gugur', 'Layu permanen', 'Tanaman membusuk atau mati'],
        solusi: 'Penggunaan Bibit Sehat: Pastikan bibit yang Anda gunakan untuk menanam krisan bebas dari infeksi Fusarium. Pilih bibit yang sehat dan berkualitas dari sumber yang terpercaya.',
        maxPoints: 5,
        point: []
    },
    {
        name: 'Ulat Tentara',
        gejala: ['Epidermis atau bagian atas daun rusak/transparan', 'Daun menguning', 'Tersisa hanya tulang daun pada tanaman', 'Hama memakan tunas dan bunga'],
        solusi: 'Pemilihan Varietas yang Tahan: Pilih varietas krisan yang diketahui tahan terhadap penyakit embun jelaga jika memungkinkan. Varietas yang tahan memiliki kemampuan bawaan untuk melawan infeksi jamur dan dapat mengurangi risiko terkena penyakit.',
        maxPoints: 4,
        point: []
    },
    {
        name: 'Tidak Ada Kecocokan Penyakit/Hama',
        gejala: ['Tidak ditemukan gejala yang spesisfik dengan penyakit yang terdeteksi'],
        solusi: 'Silahkan datangi dokter tanaman terdekat',
        point: []
    }
]

function addPoint(sample) {
    data.map((item) => {
        if (item.name === sample) {
            item.point.push(true);
        }
    })
}

function notFound() {
    const point = data[5].point.length;
    if (point === 0) {
        const tempo = [];
        tempo.push(data[5]);
        return tempo;
    }
}

function p1() {
    const point = data[0].point.length;
    if (point === 3) {
        const tempo = [];
        tempo.push(data[0]);
        return tempo;
    } else {
        return notFound();
    }
}

function p2() {
    const point = data[1].point.length;
    if (point === 3) {
        const tempo = [];
        tempo.push(data[1]);
        return tempo;
    } else {
        return notFound();
    }
}

function p3() {
    const point = data[2].point.length;
    if (point === 4) {
        const tempo = [];
        tempo.push(data[2])
        return tempo;
    } else {
        return notFound();
    }
}

function p4() {
    const point = data[3].point.length;
    if (point === 5) {
        const tempo = [];
        tempo.push(data[3])
        return tempo;
    } else {
        return notFound();
    }
}

function p5() {
    const point = data[4].point.length;
    if (point === 4) {
        const tempo = [];
        tempo.push(data[4])
        return tempo;
    } else {
        return notFound();
    }
}

const hasil = () => {
    let refilters = (samples) => {
        ;
        const results = [];
        samples.filter((items) => {
            if (items.point.length >= items.maxPoints) {
                results.push(items);
            }
        })
        return results;
    };

    const filters = data.filter((item) => {
        if (item.point.length >= 3) {
            return item.name;
        }
    });
    if (filters.length === 1) {
        for (const filter of filters) {
            switch (filter.name) {
                case 'Penggorok Daun':
                    return p1();
                    break;
                case 'Thrips':
                    return p2();
                    break;
                case 'Karat Putih':
                    return p3();
                    break;
                case 'Layu Fusarium':
                    return p4();
                    break;
                case 'Ulat Tentara':
                    return p5();
                    break;
            }
        }
    } else if (filters.length > 1) {
        return refilters(filters);
    } else {
        return notFound();
    }
}

app.get('/', (req, res) => {
    data.map((item) => {
        item.point.length = 0;
    })
    res.render('form/g1');
})

app.post('/g1', (req, res) => {
    const {
        validator
    } = req.body;
    if (validator === 'y') {
        addPoint('Penggorok Daun');
        addPoint('Thrips');
        addPoint('Ulat Tentara');
    }
    res.render('form/g2');
})

app.post('/g2', (req, res) => {
    const {
        validator
    } = req.body;
    if (validator === 'y') {
        addPoint('Penggorok Daun');
    }
    res.render('form/g3');
})

app.post('/g3', (req, res) => {
    const {
        validator
    } = req.body;
    if (validator === 'y') {
        addPoint('Penggorok Daun');
    }
    res.render('form/g4');
})

app.post('/g4', (req, res) => {
    const {
        validator
    } = req.body;
    if (validator === 'y') {
        addPoint('Thrips');
    }
    res.render('form/g5');
})

app.post('/g5', (req, res) => {
    const {
        validator
    } = req.body;
    if (validator === 'y') {
        addPoint('Thrips');
        addPoint('Karat Putih');
    }
    res.render('form/g6');
})

app.post('/g6', (req, res) => {
    const {
        validator
    } = req.body;
    if (validator === 'y') {
        addPoint('Karat Putih');
    }
    res.render('form/g7');
})

app.post('/g7', (req, res) => {
    const {
        validator
    } = req.body;
    if (validator === 'y') {
        addPoint('Karat Putih');
    }
    res.render('form/g8');
})

app.post('/g8', (req, res) => {
    const {
        validator
    } = req.body;
    if (validator === 'y') {
        addPoint('Karat Putih');
    }
    res.render('form/g9');
})

app.post('/g9', (req, res) => {
    const {
        validator
    } = req.body;
    if (validator === 'y') {
        addPoint('Layu Fusarium');
    }
    res.render('form/g10');
})

app.post('/g10', (req, res) => {
    const {
        validator
    } = req.body;
    if (validator === 'y') {
        addPoint('Layu Fusarium');
    }
    res.render('form/g11');
})

app.post('/g11', (req, res) => {
    const {
        validator
    } = req.body;
    if (validator === 'y') {
        addPoint('Layu Fusarium');
    }
    res.render('form/g12');
})

app.post('/g12', (req, res) => {
    const {
        validator
    } = req.body;
    if (validator === 'y') {
        addPoint('Layu Fusarium');
    }
    res.render('form/g13');
})

app.post('/g13', (req, res) => {
    const {
        validator
    } = req.body;
    if (validator === 'y') {
        addPoint('Layu Fusarium');
    }
    res.render('form/g14');
})

app.post('/g14', (req, res) => {
    const {
        validator
    } = req.body;
    if (validator === 'y') {
        addPoint('Ulat Tentara');
    }
    res.render('form/g15');
})

app.post('/g15', (req, res) => {
    const {
        validator
    } = req.body;
    if (validator === 'y') {
        addPoint('Ulat Tentara');
    }
    res.render('form/g16');
})

app.post('/g16', (req, res) => {
    const {
        validator
    } = req.body;
    if (validator === 'y') {
        addPoint('Ulat Tentara');
    }
    res.redirect('/result');
})

app.get('/result', (req, res) => {
    const results = hasil();
    console.log(data);
    res.render('diagnosa/index', {
        results
    });
})


app.listen(8080, () => {
    console.log('listening on http://localhost:8080');
})
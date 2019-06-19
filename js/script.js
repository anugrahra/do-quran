//tampilkan semua surat
function tampilkanSemuaSurat () {
    $.getJSON('https://al-quran-8d642.firebaseio.com/data.json?print=pretty', function (data) {
        let surat = data
        $('#surat-list').empty()
        //i adalah index, data adalah isinya
        $.each(surat, function(i, data) {
            $('#surat-list').append(`
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">` + data.nama + `&nbsp;(` + data.asma + `)</h5>
                        <h6 class = "card-subtitle mb-2 text-muted"> ` + data.arti + ` </h6>
                        <audio controls>
                            <source src="` + data.audio + `" type="audio/mpeg">
                            Your browser does not support the audio element.
                        </audio>
                        <br>
                        <a href="#" class="card-link see-detail"  data-nomor="` + data.nomor + `"data-toggle="modal" data-target="#exampleModal">Detail Surat</a>
                    </div>
                </div>
            `)
        })
    })
}
//end of tampilkan semua surat

tampilkanSemuaSurat()

//nav-link makiyyah-madaniyah
$('.nav-link').on('click', function () {
    $('.nav-link').removeClass('active')
    //this adalah nav-link yang lagi di-click
    $(this).addClass('active')

    if ($(window).width() < 1000) {
        $('.navbar-toggler').click()
    }

    let kategori = $(this).html()
    let tipe = $(this).data('tipe')
    $('h3').html(kategori + '&nbsp;&#65021;')

    if (kategori == 'Daftar Surat') {
        tampilkanSemuaSurat()
        return
    }

    if (kategori == 'About') {
        $('#surat-list').html(`
                <div class="row mt-3">
                    <div class="col-md-10 ml-3">
                        <p>
                            <i>do</i> Qur'an adalah sebuah website yang menyajikan data keterangan Al-Quran.<br>
                            <i>do</i> adalah singkatan dari <i>dekadensiotak</i>, yang merupakan sebuah nama yang kayaknya sih sifatnya itu brand kali ya.
                        </p>
                        <p>
                            Selain <i>do</i> Qur'an, project-project lain yang dibawah nama <i>dekadensiotak</i> diantaranya: <a href="https://anugrah.club/podcast">Podcast dekadensiotak</a>, <a href="https://github.com/anugrahra/do-movie"><i>do</i> Movie</a>, <a href="https://issuu.com/dekadensiotak">dekadensiotak Zine</a> dan <a href="https://dekadensiotak.wordpress.com">blog dekadensiotak</a>. Akun twitter yang bikinnya juga <a href="https://twitter.com/dekadensiotak">@dekadensiotak</a> loh. 
                        </p>
                        <p>
                            <h3><i>do</i> Qur'an is powered by:</h3>
                            <ul>
                                <li><a href="https://github.com/bachors/Al-Quran-ID-API">Al-Quran-ID-API oleh Ican Bachors</a></li>
                                <li><a href="https://code.jquery.com/">jQuery 3.4.1</a></li>
                                <li><a href="https://getbootstrap.com/docs/4.3/getting-started/introduction/">Bootstrap v4.3</a></li>
                        </p>
                        <hr>
                        <p>
                            <i>do</i> Qur'an is a part of <a href="https://github.com/anugrahra"><i>anugrah's Project</i></a>. The learning project of <a href="https://anugrah.club">Anugrah</a>, a plumber who learns coding.
                        </p>
                    </div>
                </div>
            `)
        return
    }

    $.getJSON('https://al-quran-8d642.firebaseio.com/data.json?print=pretty', function(data) {
        let surat = data
        let content = ''

        $.each(surat, function (i, data) {
            if (data.type == tipe) {
                content += `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">` + data.nama + `&nbsp;(` + data.asma + `)</h5>
                        <h6 class = "card-subtitle mb-2 text-muted"> ` + data.arti + ` </h6>
                        <audio controls>
                            <source src="` + data.audio + `" type="audio/mpeg">
                            Your browser does not support the audio element.
                        </audio>
                        <br>
                        <a href="#" class="card-link see-detail" data-nomor="` + data.nomor + `" data-toggle="modal" data-target="#exampleModal">Detail Surat</a>
                    </div>
                </div>`
            }
        })

        $('#surat-list').html(content)
    })
})
//end of nav-link makiyyah-madaniyah

//lihat detail surat
$('#surat-list').on('click', '.see-detail', function () {
    let nomorSurat = $(this).data('nomor')
    
    $.getJSON('https://al-quran-8d642.firebaseio.com/data.json?print=pretty', function (data) {
        let surat = data
        let detilSurat = ''
        let title = ''
        let tempat = ''

        $.each(surat, function (i, data) {
            if (data.nomor == nomorSurat) {
                $('.modal-title').html('')
                $('.modal-body').html('')
                title = data.nama + '&nbsp;(&nbsp;' + data.asma + '&nbsp;)'
                tempat = data.type.toLowerCase().replace(/\b[a-z]/g, function (letter) {
                    return letter.toUpperCase();
                })

                detilSurat = `
                <div class="container-fluid">
                    <div class="row">
                        <div class="col">
                            <ul class="list-group">
                                <li class="list-group-item"><b>Arti:&nbsp;</b>` + data.arti + `</li>
                                <li class="list-group-item"><b>Keterangan:</b><br>` + data.keterangan + `</li>
                                <li class="list-group-item"><b>Tempat Turun:&nbsp;</b>` + tempat + `</li>
                                <li class="list-group-item"><b>Urutan Pewahyuan:&nbsp;</b>` + data.urut + `</li>
                                <li class="list-group-item"><b>Jumlah Ayat:&nbsp;</b>` + data.ayat + `</li>
                                <li class="list-group-item"><b>Jumlah Ruku&apos;:&nbsp;</b>` + data.rukuk + `</li>
                                <li class="list-group-item"><b>Dengar Surat:<br></br>
                                    <audio controls>
                                        <source src="` + data.audio + `" type="audio/mpeg">
                                        Your browser does not support the audio element.
                                    </audio>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>`
            }
        })
        
        $('.modal-title').html(title)
        $('.modal-body').html(detilSurat)
    })
})
//end of lihat detail surat

//search surat
function searchSurat() {
    let keyword = $('#search-input').val()
    $.getJSON('https://al-quran-8d642.firebaseio.com/data.json?print=pretty', function (surat) {
        
        $.each(surat, function (i, data) {
            if (surat.nama == keyword) {
                $('#surat-list').html('')

                hasilCari = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">` + data.nama + `&nbsp;(` + data.asma + `)</h5>
                            <h6 class = "card-subtitle mb-2 text-muted"> ` + data.arti + ` </h6>
                            <audio controls>
                                <source src="` + data.audio + `" type="audio/mpeg">
                                Your browser does not support the audio element.
                            </audio>
                            <br>
                            <a href="#" class="card-link see-detail"  data-nomor="` + data.nomor + `"data-toggle="modal" data-target="#exampleModal">Detail Surat</a>
                        </div>
                    </div>`
            }
        })
        $('#surat-list').html(hasilCari)
    })
}

$('#search-button').on('click', function () {
    searchSurat()
})

$('#search-input').on('keyup', function (e) {
    if (e.which === 13) {
        searchSurat()
    }
})
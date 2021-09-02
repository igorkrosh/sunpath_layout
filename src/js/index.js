$(document).ready(Core);

function Core()
{
    SetTabSwitcher();
    SetModal();

    InitOwlCarousel();

    SetProgress();
}

function SetTabSwitcher()
{
    $('.btn__tab__switch').on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('active'))
        {
            return;
        }

        $('.btn__tab__switch').removeClass('active');
        $(this).addClass('active');

        let targetTab = $(this).attr('target');

        SwitchTab(targetTab)
    })
}

function SwitchTab(target)
{
    
    $('.tab.active').animate({
        opacity: 0
    }, 500, function() {
        $('.tab.active').removeClass('active');

        $(`[tab-name="${target}"]`).css('opacity', 0);
        $(`[tab-name="${target}"]`).addClass('active');
        
        let tabHeight = $(`[tab-name="${target}"]`)[0].clientHeight;
        $(`[tab-name="${target}"]`).closest('.tab__viewer').css('height', `${tabHeight}px`)

        $(`[tab-name="${target}"]`).animate({
            opacity: 1
        }, 500)
    })
}

function SetModal()
{
    $('[modal]').on('click', function()
    {
        let modalId = $(this).attr('modal');
        ShowModal(`#${modalId}`);
    });

    $('.modal__dialog').on('click', function(e) {
        e.stopPropagation();
    });

    $('.modal').on('click', function() {
        HideModal(`#${$(this).attr('id')}`);
    });

    $('.btn__modal__close').on('click', function ()
    {
        let modalId = $(this).closest('.modal').attr('id');
        HideModal(`#${modalId}`);
    });
}

function ShowModal(modalId)
{
    $(modalId + ' .modal__dialog').off('animationend');
    $(modalId).addClass('active');
    $('body').addClass('lock');
    $(modalId + ' .modal__dialog').addClass('fadeInDownBig')
    
    $('body').append('<div class="modal__backdrop"></div>');
    setTimeout(function() {
        $('.modal__backdrop').addClass('active');
    }, 50)
}

function HideModal(modalId)
{
    $(modalId + ' .modal__dialog').removeClass('fadeInDownBig');
    $(modalId + ' .modal__dialog').addClass('fadeOutDownBig');
    $('.modal__backdrop').removeClass('active');
    $('body').removeClass('lock');
    $(modalId + ' .modal__dialog').on('animationend', function() {
        if (!$(modalId).hasClass('active'))
        {
            return;
        }
        $(modalId).removeClass('active');
        $(modalId + ' .modal__dialog').removeClass('fadeOutDownBig');
        $('.modal__backdrop').remove();
    });
}

function InitOwlCarousel()
{
    $('section.main__section .owl-carousel').owlCarousel({
        items: 1,
        navContainer: 'section.main__section .navs',
        dotsContainer: 'section.main__section .dots',
        autoHeight: true
    });

    $('section.need__help .owl-carousel').owlCarousel({
        items: 3,
        autoHeight: true,
        navContainer: 'section.need__help .navs',
    });

    $('section.successful_stories .owl-carousel').owlCarousel({
        loop: true,
        center: true,
        autoWidth: true,
        navContainer: 'section.successful_stories .navs',
        nav: true,
    }).on('translated.owl.carousel', function(event) {
        $('section.successful_stories .owl-carousel .center').prev().addClass('big');
    }).on('change.owl.carousel', function(event) {
        $('section.successful_stories .owl-carousel .big').removeClass('big');
    })

    $('section.successful_stories .owl-carousel .center').prev().addClass('big');
}

function SetProgress()
{
    let progressArray = $('.card .progress');

    for (let progress of progressArray)
    {
        let value = $(progress).attr('value');
        $(progress).find('.line').css(`width`, `${value}%`);
    }
}
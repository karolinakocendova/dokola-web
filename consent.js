(function(){
  var GA_ID='G-1X85M3M9SH';
  var FB_PIXEL_ID='916228704485199';
  var KEY='dokola-consent';

  function loadGA(){
    if(document.getElementById('ga-script'))return;
    var s=document.createElement('script');
    s.async=true;s.id='ga-script';
    s.src='https://www.googletagmanager.com/gtag/js?id='+GA_ID;
    document.head.appendChild(s);
    window.dataLayer=window.dataLayer||[];
    window.gtag=function(){dataLayer.push(arguments);};
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  function loadPixel(){
    if(window.fbq)return;
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', FB_PIXEL_ID);
    fbq('track', 'PageView');
  }

  function loadAll(){ loadGA(); loadPixel(); }

  function getConsent(){ try{ return localStorage.getItem(KEY); }catch(e){ return null; } }
  function setConsent(v){ try{ localStorage.setItem(KEY, v); }catch(e){} }

  function closeBanner(){
    var el=document.getElementById('cookie-banner');
    if(el){ el.classList.remove('open'); setTimeout(function(){ el.remove(); }, 250); }
  }

  function showBanner(){
    if(document.getElementById('cookie-banner')) return;
    var el=document.createElement('div');
    el.id='cookie-banner';
    el.innerHTML =
      '<div class="cb-inner">' +
        '<p>Používáme cookies pro měření návštěvnosti a reklamu. <a href="cookies.html">Víc o cookies</a>.</p>' +
        '<div class="cb-btns">' +
          '<button type="button" class="cb-reject">Odmítnout</button>' +
          '<button type="button" class="cb-accept">Přijmout</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(el);
    requestAnimationFrame(function(){ el.classList.add('open'); });
    el.querySelector('.cb-accept').addEventListener('click', function(){
      setConsent('accepted'); loadAll(); closeBanner();
    });
    el.querySelector('.cb-reject').addEventListener('click', function(){
      setConsent('rejected'); closeBanner();
    });
  }

  window.reopenCookieSettings = function(){ showBanner(); };

  function init(){
    var c = getConsent();
    if(c === 'accepted'){ loadAll(); }
    else if(c !== 'rejected'){ showBanner(); }
    document.querySelectorAll('.cookie-settings-link').forEach(function(a){
      a.addEventListener('click', function(e){ e.preventDefault(); showBanner(); });
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();

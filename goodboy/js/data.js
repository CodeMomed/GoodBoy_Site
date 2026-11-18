/* Configuração e catálogo. Edita aqui preços, nomes, número de WhatsApp e fotos. */
window.GB = {
  wa: '258848498606',          // WhatsApp com indicativo, sem + nem espaços
  site: '',                    // vazio = usa o endereço atual; ou 'https://teudominio.com/'
  drop: 'Base Vol.1',
  pay: ['M-Pesa', 'e-Mola', 'Conta bancária'],
  sizes: ['S', 'M', 'L', 'XL'],
  // Banner: fotos de modelos (bg = cor do fundo da foto, o banner assume essa cor)
  slides: [
    { img: 'assets/img/models/tee-branca-costas.jpg', bg: '#c5c8d0', id: 'tee-branca', alt: 'Modelo de costas com camiseta branca Goodboy' },
    { img: 'assets/img/models/tee-preta.jpg', bg: '#e3ded9', id: 'tee-preta', alt: 'Modelo com camiseta preta Goodboy' },
    { img: 'assets/img/models/tee-branca-frente.jpg', bg: '#e8e7e6', id: 'tee-branca', alt: 'Modelo com camiseta branca Goodboy' },
    { img: 'assets/img/models/polo-branca.jpg', bg: '#c8cacd', id: 'polo-branca', alt: 'Modelo com polo branca Goodboy' }
  ],
  // Catálogo: fotos só do produto. Preços fictícios em MT (t: tee | polo | cap)
  products: [
    { id: 'tee-preta', n: 'Camiseta Oversized', c: 'Preta', p: 1200, t: 'tee', img: 'assets/img/products/tee-preta.jpg', d: 'Corte oversized. Logo pequeno no peito e logo grande nas costas.' },
    { id: 'tee-branca', n: 'Camiseta Oversized', c: 'Branca', p: 1200, t: 'tee', img: 'assets/img/products/tee-branca.jpg', d: 'Corte oversized. Logo pequeno no peito e logo grande nas costas.' },
    { id: 'polo-preta', n: 'Polo', c: 'Preta', p: 1650, t: 'polo', img: 'assets/img/products/polo-preta.jpg', d: 'Polo com o logo no peito e “Stay true” na bainha.' },
    { id: 'polo-branca', n: 'Polo', c: 'Branca', p: 1650, t: 'polo', img: 'assets/img/products/polo-branca.jpg', d: 'Polo com o logo no peito e “Stay true” na bainha.' },
    { id: 'bone-preto', n: 'Boné Trucker', c: 'Preto', p: 750, t: 'cap', img: 'assets/img/products/bone-preto.jpg', d: 'Boné trucker com o logo Goodboy na frente.' },
    { id: 'bone-branco', n: 'Boné Trucker', c: 'Branco', p: 750, t: 'cap', img: 'assets/img/products/bone-branco.jpg', d: 'Boné trucker com o logo Goodboy na frente.' }
  ]
};

# 📸 Como Adicionar Fotos dos Projetos

## 📁 Estrutura de Pastas
```
assets/
├── fotos/
│   ├── projetos-profissionais/
│   │   ├── gemus-bpa.jpg
│   │   ├── ia-saude.jpg
│   │   └── migracao-sisreg.jpg
│   ├── trabalhos-academicos/
│   │   ├── locadora-mysql.jpg
│   │   ├── mercado-sistema.jpg
│   │   └── modelagem-dados.jpg
│   └── participacao-academica/
│       ├── trabalhos-grupo.jpg
│       ├── projetos-integradores.jpg
│       └── competicoes.jpg
```

## 🔧 Como Substituir os Gradientes por Fotos

### 1. **Projetos Profissionais** (`fotos-projetos.html`)
Substitua cada `<div class="card-img-top">` por:

```html
<img src="assets/fotos/projetos-profissionais/gemus-bpa.jpg" 
     class="card-img-top" 
     style="height: 250px; object-fit: cover;" 
     alt="Sistema GEMUS BPA">
```

### 2. **Trabalhos Acadêmicos** (`fotos-trabalhos.html`)
Substitua cada `<div class="card-img-top">` por:

```html
<img src="assets/fotos/trabalhos-academicos/locadora-mysql.jpg" 
     class="card-img-top" 
     style="height: 250px; object-fit: cover;" 
     alt="Sistema de Locadora MySQL">
```

### 3. **Participação Acadêmica** (`fotos-participacao.html`)
Substitua cada `<div class="card-img-top">` por:

```html
<img src="assets/fotos/participacao-academica/trabalhos-grupo.jpg" 
     class="card-img-top" 
     style="height: 250px; object-fit: cover;" 
     alt="Trabalhos em Grupo">
```

## 📱 Formatos de Imagem Recomendados
- **Formato**: JPG ou PNG
- **Tamanho**: 800x600 pixels (mínimo)
- **Peso**: Máximo 500KB por imagem
- **Qualidade**: Boa, mas otimizada para web

## 🎨 Estilo das Imagens
- **Proporção**: 4:3 ou 16:9
- **Foco**: Mostrar o projeto/atividade claramente
- **Iluminação**: Boa para destacar detalhes
- **Composição**: Centralizada e organizada

## 🚀 Exemplo Completo
```html
<!-- Antes (gradiente) -->
<div class="card-img-top" style="height: 250px; background: linear-gradient(135deg, #28a745, #20c997);">
  <div class="text-center p-3">
    <h4 class="text-white mb-2">🔄</h4>
    <h6 class="text-white">GEMUS BPA</h6>
  </div>
</div>

<!-- Depois (foto real) -->
<img src="assets/fotos/projetos-profissionais/gemus-bpa.jpg" 
     class="card-img-top" 
     style="height: 250px; object-fit: cover;" 
     alt="Sistema GEMUS BPA - Fluxograma">
```

## 💡 Dicas
1. **Nomes dos arquivos**: Use nomes descritivos e sem espaços
2. **Alt text**: Sempre inclua descrições para acessibilidade
3. **Responsividade**: As imagens se ajustam automaticamente
4. **Backup**: Mantenha as versões originais das fotos


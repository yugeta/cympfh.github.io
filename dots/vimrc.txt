syntax on
set nobackup noswapfile
set ambiwidth=single
set number
set ruler showcmd incsearch nohlsearch showmatch
set autoindent smartindent
set modeline history=50
set foldlevel=100 foldmethod=marker
set tabstop=2 shiftwidth=2 softtabstop=2 expandtab
set backspace=start,indent,eol
set wildmode=longest,list,full
set timeout ttimeoutlen=100
set mouse=

"===============
" plugin
"================

filetype plugin indent on
set rtp+=~/.vim/vundle.git/
call vundle#rc()

" tools

" Bundle "Shougo/vimproc.vim"
Bundle "rbtnn/rabbit-ui.vim"
function! s:edit_csv(path)
    call writefile(map(rabbit_ui#gridview(map(readfile(a:path),'split(v:val,",",1)')), "join(v:val, ',')"), a:path)
endfunction
command! -nargs=1 EditCSV  :call <sid>edit_csv(<q-args>)

Bundle "mru.vim"

Bundle "cympfh/vimwiki"
let g:vimwiki_list = [{'path': '~/Dropbox/study', 'syntax': 'markdown', 'ext': '.mkd'}]

Bundle "renamer.vim"

Bundle "tyru/caw.vim.git"
nmap <Leader>v <Plug>(caw:i:toggle)
vmap <Leader>v <Plug>(caw:i:toggle)

" syntax
" Bundle 'plasticboy/vim-markdown'
Bundle 'kana/vim-filetype-haskell'
Bundle 'kchmck/vim-coffee-script'

" game
Bundle "rbtnn/puyo.vim"

" color
Bundle "w0ng/vim-hybrid"
Bundle "molokai"

"===============
"外見
"================

hi SpellBad     ctermbg=White

let g:markdown_fenced_languages = [
\ 'css',
\ 'javascript',
\ 'js=javascript',
\ 'json=javascript',
\ 'haskell',
\ 'hs=haskell'
\]

set laststatus=2
set statusline=%<%f\ %m%r%h%w
set statusline+=%{'['.(&fenc!=''?&fenc:&enc).']['.&fileformat.']'}
set statusline+=%=%l/%L,%c%V%8P

set cursorline
hi CursorLine   cterm=NONE ctermbg=7 ctermfg=NONE
hi CursorLineNr cterm=NONE ctermbg=0 ctermfg=white
nn <leader>c :set cursorline!<cr>

"========================
" eninvalid some vim operator
"==================================

map <F1> <nop>
map q: <nop>
map Q <nop>
map <C-Space> <nop>

"========================
" command
"==================================

" operate tab
nnoremap <C-t> :tabnew<CR>
nnoremap gb gT
nnoremap <C-p> gT
nnoremap <C-n> gt

" delete opening file
fun! s:deleteThis()
    let c = input("delete this? [Y/n] > ")
    if c != "no" || c != "の"
      :!rm %
      :norm ZQ
    endif
endfun
nn <silent> <Del><Del> :call <SID>deleteThis()<cr>

nn <silent> <leader>f :let @f=expand("%:p")<cr>:echo @f<cr>
ino <c-o> <c-x><c-k>

nn ] :cnext<cr>
nn [ :cprevious<cr>

"
" copy and paste
"
nn <leader>y :w !xsel -bi<cr>
vn <leader>y :w !xsel -bi<cr>
nn <leader>p :r !xsel -bo<cr>

"================================================
" for programming (also ref prg.vim)
"================================================

source ~/Dropbox/cympfh/vim/prg.vim
source ~/Dropbox/cympfh/vim/math.vim
source ~/Dropbox/cympfh/vim/eng.vim

"=======================
set fencs=utf8,euc-jp,sjis,cp932,default,latin1

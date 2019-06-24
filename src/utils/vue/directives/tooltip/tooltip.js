let tooltipId = 0;
let tooltipsList = {};

function updateTooltipPosition(el, tooltip, options) {
  const { align, offset } = options;

  const rectEl = el.getBoundingClientRect();
  const rectTooltip = tooltip.getBoundingClientRect();

  switch (align) {
    case 'left':
      tooltip.style.transform = `translate(${rectEl.left}px, ${rectEl.top - rectTooltip.height - offset}px)`;
      updateTooltipAlignment(tooltip, align);
      break;
    case 'right':
      tooltip.style.transform = `translate(${rectEl.left + rectEl.width - rectTooltip.width}px, ${rectEl.top - rectTooltip.height - offset}px)`;
      updateTooltipAlignment(tooltip, align);
      break;
    case 'center':
      tooltip.style.transform = `translate(${rectEl.left + (rectEl.width / 2) - (rectTooltip.width / 2)}px, ${rectEl.top - rectTooltip.height - offset}px)`;
      updateTooltipAlignment(tooltip, align);
      break;
  }
}

function updateTooltipAlignment(tooltip, align) {
  const alignments = ['left', 'right', 'center'];

  if (tooltip) {
    alignments.forEach(element => {
      tooltip.classList.remove(`tooltip--align_${element}`);
    });

    tooltip.classList.add(`tooltip--align_${align}`);
  }
}

function getDirectiveProperties(value) {
  return {
    content: value.hasOwnProperty('content') ? value.content : '',
    offset: value.hasOwnProperty('offset') ? value.offset : 10,
    align: value.hasOwnProperty('align') ? value.align : 'left'
  };
}

function documentScrollHandler() {
  Object.values(tooltipsList).forEach(entry => {
    // Do it only if tooltip is visible on the screen
    if (entry.tooltip.offsetHeight) {
      updateTooltipPosition(entry.el, entry.tooltip, { align: entry.align, offset: entry.offset });
    }
  })
}

export default {
  inserted(el, binding) {
    const { content, offset, align } = getDirectiveProperties(binding.value);

    const tooltip = document.createElement('div');

    if (Object.keys(tooltipsList).length === 0) {
      document.addEventListener('scroll', documentScrollHandler);
    }

    tooltip.dataset.tooltipId = tooltipId;
    tooltip.classList.add('tooltip');
    tooltip.style.position = 'fixed';
    tooltip.style.top = 0;
    tooltip.style.left = 0;

    tooltip.innerHTML = content;

    let animationTimeout = null;
    // Bind events
    el.addEventListener('mouseenter', () => {
      if (animationTimeout) {
        clearTimeout(animationTimeout);
      }

      tooltip.style.display = 'block';
      tooltip.classList.add('tooltip--visible');

      updateTooltipPosition(el, tooltip, { align, offset });
    });
  
    el.addEventListener('mouseleave', () => {
      tooltip.classList.remove('tooltip--visible');

      animationTimeout = setTimeout(() => {
        tooltip.style.display = 'none';
      }, 200);
    });

    el.appendChild(tooltip);

    tooltipsList[tooltipId] = { el, tooltip, align, offset };
    tooltipId++;
  },
  update(el, binding) {
    const tooltip = el.querySelector('.tooltip');

    const { content, offset, align } = getDirectiveProperties(binding.value);

    if (tooltip && content !== binding.oldValue.content) {
      tooltip.innerHTML = content;
      updateTooltipPosition(el, tooltip, { align, offset });
    }

    if (tooltip && align !== binding.oldValue.align) {
      updateTooltipPosition(el, tooltip, { align, offset });
    }
  },
  unbind(el) {
    const tooltip = el.querySelector('.tooltip');
    const tooltipId = tooltip.dataset.tooltipId;

    delete tooltipsList[tooltipId]

    if (Object.keys(tooltipsList).length === 0) {
      document.removeEventListener('scroll', documentScrollHandler);
    }
  }
}
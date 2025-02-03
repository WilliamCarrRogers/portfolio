export const Container = ({ children }) => {
    return (
        <div className="flex-container">
            {children}
        </div>
    )
}
export const Col = ({ children, size }) => {
    return (
        <div className={'col-' + (size || '12')}>
            {children}
        </div>
    )
}